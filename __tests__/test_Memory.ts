import { Memory, Address } from '../src';

describe('constructor', () => {
  test('no parameters', () => {
    expect(new Memory()).toBeInstanceOf(Memory);
    expect(new Memory().getBuffer().slice(0, 8)).toEqual(
      Buffer.alloc(8).fill(0),
    );
  });
  test('with parameters', () => {
    expect(new Memory((i) => i * 42)).toBeInstanceOf(Memory);
    expect(new Memory((i) => i * 42).getBuffer().slice(0, 8)).toEqual(
      Buffer.from([0, 42, 42 * 2, 42 * 3, 42 * 4, 42 * 5, 42 * 6, 42 * 7]),
    );
  });
});

test('Memory.fromBuffer', () => {
  expect(Memory.fromBuffer(Buffer.from([1, 2, 3, 4, 5]))).toBeInstanceOf(
    Memory,
  );
  expect(
    Memory.fromBuffer(Buffer.from([1, 2, 3, 4, 5]))
      .getBuffer()
      .slice(0, 8),
  ).toEqual(Buffer.from([1, 2, 3, 4, 5, 0, 0, 0]));
});

test('getBuffer', () => {
  const foo = new Memory();

  expect(foo.getBuffer()).toBeInstanceOf(Buffer);
  expect(foo.getBuffer().length).toBe(0x10000);
  expect(foo.getBuffer()).not.toBe(foo.getBuffer());
});

test('readInt8', () => {
  const foo = Memory.fromBuffer(
    Buffer.from([0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff]),
  );

  expect(foo.readInt8(0)).toBe(0x00);
  expect(foo.readInt8(1)).toBe(0x01);
  expect(foo.readInt8(2)).toBe(0x7f);
  expect(foo.readInt8(new Address('', 3))).toBe(0x80 - 0x100);
  expect(foo.readInt8(new Address('', 4))).toBe(0xfe - 0x100);
  expect(foo.readInt8(new Address('', 5))).toBe(0xff - 0x100);
});

test('readUInt8', () => {
  const foo = Memory.fromBuffer(
    Buffer.from([0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff]),
  );

  expect(foo.readUInt8(0)).toBe(0x00);
  expect(foo.readUInt8(1)).toBe(0x1);
  expect(foo.readUInt8(2)).toBe(0x7f);
  expect(foo.readUInt8(new Address('', 3))).toBe(0x80);
  expect(foo.readUInt8(new Address('', 4))).toBe(0xfe);
  expect(foo.readUInt8(new Address('', 5))).toBe(0xff);
});

test('readInt16', () => {
  const foo = Memory.fromBuffer(
    Buffer.from([0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff]),
  );

  expect(foo.readInt16(0)).toBe(0x0100);
  expect(foo.readInt16(1)).toBe(0x7f01);
  expect(foo.readInt16(new Address('', 2))).toBe(0x807f - 0x10000);
  expect(foo.readInt16(new Address('', 3))).toBe(0xfe80 - 0x10000);
  expect(foo.readInt16(new Address('', 4))).toBe(0xfffe - 0x10000);
});

test('readUInt16', () => {
  const foo = Memory.fromBuffer(
    Buffer.from([0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff]),
  );

  expect(foo.readUInt16(0)).toBe(0x0100);
  expect(foo.readUInt16(1)).toBe(0x7f01);
  expect(foo.readUInt16(new Address('', 2))).toBe(0x807f);
  expect(foo.readUInt16(new Address('', 3))).toBe(0xfe80);
  expect(foo.readUInt16(new Address('', 4))).toBe(0xfffe);
});

test('writeInt8', () => {
  const foo = new Memory();

  foo.writeInt8(0x00, 0);
  foo.writeInt8(0x01, 1);
  foo.writeInt8(0x7f, 2);
  foo.writeInt8(0x80, 3);
  foo.writeInt8(0xfe, 4);
  foo.writeInt8(0xff, 5);
  foo.writeInt8(0x80 - 0x100, new Address('', 6));
  foo.writeInt8(0xfe - 0x100, new Address('', 7));
  foo.writeInt8(0xff - 0x100, new Address('', 8));

  expect(foo.getBuffer().slice(0, 9)).toEqual(
    Buffer.from([0x00, 0x01, 0x7f, 0x80, 0xfe, 0xff, 0x80, 0xfe, 0xff]),
  );
});

test('writeInt16', () => {
  const foo = new Memory();

  foo.writeInt16(0x0100, 0);
  foo.writeInt16(0x7f01, 2);
  foo.writeInt16(0x807f, 4);
  foo.writeInt16(0xfe80, 6);
  foo.writeInt16(0xfffe, 8);
  foo.writeInt16(0x807f - 0x10000, new Address('', 10));
  foo.writeInt16(0xfe80 - 0x10000, new Address('', 12));
  foo.writeInt16(0xfffe - 0x10000, new Address('', 14));

  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([
      0x00,
      0x01,
      0x01,
      0x7f,
      0x7f,
      0x80,
      0x80,
      0xfe,
      0xfe,
      0xff,
      0x7f,
      0x80,
      0x80,
      0xfe,
      0xfe,
      0xff,
    ]),
  );
});

test('setFlag', () => {
  const foo = Memory.fromBuffer(Buffer.from([0x00, 0xff]));

  foo.setFlag(0, 0);
  foo.setFlag(2, 0);
  foo.setFlag(4, new Address('', 0));
  foo.setFlag(6, new Address('', 0));
  foo.setFlag(1, 1);
  foo.setFlag(3, 1);
  foo.setFlag(5, new Address('', 1));
  foo.setFlag(7, new Address('', 1));
  expect(foo.getBuffer().slice(0, 2)).toEqual(Buffer.from([0x55, 0xff]));
});

test('unsetFlag', () => {
  const foo = Memory.fromBuffer(Buffer.from([0x00, 0xff]));

  foo.unsetFlag(0, 0);
  foo.unsetFlag(2, 0);
  foo.unsetFlag(4, new Address('', 0));
  foo.unsetFlag(6, new Address('', 0));
  foo.unsetFlag(1, 1);
  foo.unsetFlag(3, 1);
  foo.unsetFlag(5, new Address('', 1));
  foo.unsetFlag(7, new Address('', 1));
  expect(foo.getBuffer().slice(0, 2)).toEqual(Buffer.from([0x00, 0x55]));
});

test('isSetFlag', () => {
  const foo = Memory.fromBuffer(Buffer.from([0xaa, 0x55]));

  expect(foo.isSetFlag(0, 0)).toBe(false);
  expect(foo.isSetFlag(1, 0)).toBe(true);
  expect(foo.isSetFlag(2, 0)).toBe(false);
  expect(foo.isSetFlag(3, 0)).toBe(true);
  expect(foo.isSetFlag(4, new Address('', 0))).toBe(false);
  expect(foo.isSetFlag(5, new Address('', 0))).toBe(true);
  expect(foo.isSetFlag(6, new Address('', 0))).toBe(false);
  expect(foo.isSetFlag(7, new Address('', 0))).toBe(true);

  expect(foo.isSetFlag(0, 1)).toBe(true);
  expect(foo.isSetFlag(1, 1)).toBe(false);
  expect(foo.isSetFlag(2, 1)).toBe(true);
  expect(foo.isSetFlag(3, 1)).toBe(false);
  expect(foo.isSetFlag(4, new Address('', 1))).toBe(true);
  expect(foo.isSetFlag(5, new Address('', 1))).toBe(false);
  expect(foo.isSetFlag(6, new Address('', 1))).toBe(true);
  expect(foo.isSetFlag(7, new Address('', 1))).toBe(false);
});

test('fill', () => {
  const foo = new Memory();

  foo.fill(42, 0, 8);
  expect(foo.getBuffer().slice(0, 10)).toEqual(
    Buffer.from([42, 42, 42, 42, 42, 42, 42, 42, 42, 0]),
  );

  foo.fill(43, new Address('', 0), new Address('', 8));
  expect(foo.getBuffer().slice(0, 10)).toEqual(
    Buffer.from([43, 43, 43, 43, 43, 43, 43, 43, 43, 0]),
  );

  foo.fill(44, 8, 0);
  expect(foo.getBuffer().slice(0, 10)).toEqual(
    Buffer.from([43, 43, 43, 43, 43, 43, 43, 43, 43, 0]),
  );

  foo.fill(45, new Address('', 8), new Address('', 0));
  expect(foo.getBuffer().slice(0, 10)).toEqual(
    Buffer.from([43, 43, 43, 43, 43, 43, 43, 43, 43, 0]),
  );
});

test('copyForward', () => {
  const foo = Memory.fromBuffer(Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]));

  foo.copyForward(0, 8, 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]),
  );

  foo.copyForward(new Address('', 0), new Address('', 1), 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7]),
  );

  foo.copyForward(8, new Address('', 0), 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]),
  );
});

test('copyBackward', () => {
  const foo = Memory.fromBuffer(Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]));

  foo.copyBackward(0, 8, 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7]),
  );

  foo.copyBackward(new Address('', 0), new Address('', 1), 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([0, 0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7]),
  );

  foo.copyBackward(8, new Address('', 0), 8);
  expect(foo.getBuffer().slice(0, 16)).toEqual(
    Buffer.from([7, 1, 2, 3, 4, 5, 6, 7, 7, 1, 2, 3, 4, 5, 6, 7]),
  );
});

test('comment', () => {
  const foo = new Memory((i) => i);
  const bar = foo.getBuffer();

  foo.comment('comment');

  expect(foo.getBuffer()).toEqual(bar);
});
