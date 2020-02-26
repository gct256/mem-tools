import { Memory, Address } from '../src';

test('read8', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    read8(address, result, buffer) {
      data.push({ address, result });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.readUInt8(42);
  foo.readUInt8(new Address('foo', 43));
  foo.readInt8(44);
  foo.readInt8(new Address('bar', 45));
  foo.isSetFlag(0, 46);
  foo.isSetFlag(0, new Address('baz', 47));

  expect(data).toEqual([
    { address: new Address(undefined, 42), result: 42 },
    { address: new Address('foo', 43), result: 43 },
    { address: new Address(undefined, 44), result: 44 },
    { address: new Address('bar', 45), result: 45 },
    { address: new Address(undefined, 46), result: 46 },
    { address: new Address('baz', 47), result: 47 },
  ]);
});

test('read16', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    read16(address, result, buffer) {
      data.push({ address, result });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.readUInt16(0x2a);
  foo.readUInt16(new Address('foo', 0x2b));
  foo.readInt16(0x2c);
  foo.readInt16(new Address('bar', 0x2d));

  expect(data).toEqual([
    { address: new Address(undefined, 42), result: 0x2b2a },
    { address: new Address('foo', 43), result: 0x2c2b },
    { address: new Address(undefined, 44), result: 0x2d2c },
    { address: new Address('bar', 45), result: 0x2e2d },
  ]);
});

test('write8', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    write8(value, address, buffer) {
      data.push({ value, address });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.writeInt8(1, 42);
  foo.writeInt8(2, new Address('foo', 43));
  foo.setFlag(7, 44);
  foo.setFlag(7, new Address('bar', 45));
  foo.unsetFlag(3, 46);
  foo.unsetFlag(3, new Address('baz', 47));

  foo.setFlag(4, 48);
  foo.setFlag(4, new Address('qux', 49));
  foo.unsetFlag(7, 50);
  foo.unsetFlag(7, new Address('quux', 51));

  expect(data).toEqual([
    { value: 1, address: new Address(undefined, 42) },
    { value: 2, address: new Address('foo', 43) },
    { value: 44 + 128, address: new Address(undefined, 44) },
    { value: 45 + 128, address: new Address('bar', 45) },
    { value: 46 - 8, address: new Address(undefined, 46) },
    { value: 47 - 8, address: new Address('baz', 47) },
    { value: 48, address: new Address(undefined, 48) },
    { value: 49, address: new Address('qux', 49) },
    { value: 50, address: new Address(undefined, 50) },
    { value: 51, address: new Address('quux', 51) },
  ]);
});

test('write16', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    write16(value, address, buffer) {
      data.push({ value, address });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.writeInt16(0x1234, 42);
  foo.writeInt16(0x5678, new Address('foo', 44));

  expect(data).toEqual([
    { value: 0x1234, address: new Address(undefined, 42) },
    { value: 0x5678, address: new Address('foo', 44) },
  ]);
});

test('fill', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    fill(value, from, to, buffer) {
      data.push({ value, from, to });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.fill(42, 0, 7);
  foo.fill(43, new Address('foo', 8), new Address('bar', 15));

  expect(data).toEqual([
    {
      value: 42,
      from: new Address(undefined, 0),
      to: new Address(undefined, 7),
    },
    { value: 43, from: new Address('foo', 8), to: new Address('bar', 15) },
  ]);
});

test('copyForward', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    copyForward(src, dest, count, buffer) {
      data.push({ src, dest, count });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.copyForward(0, 8, 8);
  foo.copyForward(new Address('foo', 16), new Address('bar', 24), 8);

  expect(data).toEqual([
    {
      src: new Address(undefined, 0),
      dest: new Address(undefined, 8),
      count: 8,
    },
    { src: new Address('foo', 16), dest: new Address('bar', 24), count: 8 },
  ]);
});

test('copyBackward', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    copyBackward(src, dest, count, buffer) {
      data.push({ src, dest, count });
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.copyBackward(0, 8, 8);
  foo.copyBackward(new Address('foo', 16), new Address('bar', 24), 8);

  expect(data).toEqual([
    {
      src: new Address(undefined, 0),
      dest: new Address(undefined, 8),
      count: 8,
    },
    { src: new Address('foo', 16), dest: new Address('bar', 24), count: 8 },
  ]);
});

test('comment', () => {
  const foo = new Memory((i) => i);
  const data = [];

  foo.addListener({
    comment(comment, buffer) {
      data.push(comment);
      expect(buffer).toEqual(foo.getBuffer());
    },
  });

  foo.comment('foo');
  foo.comment('bar');

  expect(data).toEqual(['foo', 'bar']);
});

test('empty', () => {
  const foo = new Memory((i) => i);

  foo.addListener({});

  expect(() => {
    foo.readInt8(42);
    foo.writeInt8(1, 43);
    foo.readInt16(44);
    foo.writeInt16(2, 45);
    foo.fill(3, 46, 47);
    foo.copyForward(48, 49, 3);
    foo.copyBackward(50, 51, 4);
    foo.comment('foo');
  }).not.toThrow();
});
