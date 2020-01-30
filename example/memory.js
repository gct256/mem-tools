const common = require('./common');

const { Memory, formatters } = require('..');

common.example('initialize', () => {
  common.dump(new Memory());
});

common.example('initialize with initializer', () => {
  common.dump(new Memory(() => Math.floor(Math.random() * 256)));
});

common.example('read', () => {
  const mem = new Memory((i) => 255 - i);

  common.dump(mem, 0x3f, [1, 3, 6, 7, 9, 10]);
  common.log(
    [formatters.hex16(1), '>', formatters.hex8(mem.readUInt8(1))],
    [formatters.hex16(3), '>', formatters.hex8(mem.readInt8(3))],
    [formatters.hex16(6), '>', formatters.hex16(mem.readUInt16(6))],
    [formatters.hex16(9), '>', formatters.hex16(mem.readInt16(9))],
  );
});

common.example('write', () => {
  const mem = new Memory();

  common.dump(mem, 0x3f, [0, 2, 3]);

  mem.writeInt8(0x12, 0);
  mem.writeInt16(0x3456, 2);

  common.log(
    [formatters.hex16(0), '<', formatters.hex8(0x12)],
    [formatters.hex16(2), '<', formatters.hex16(0x3456)],
  );

  common.dump(mem, 0x3f, [0, 2, 3]);
});

common.example('fill', () => {
  const mem = new Memory();

  common.dump(mem, 0x3f, [2, 3, 4, 5, 6]);
  mem.fill(0x42, 2, 6);
  common.log('fill 0x42 --> [2 ... 6]');
  common.dump(mem, 0x3f, [2, 3, 4, 5, 6]);
});

common.example('copy forward', () => {
  const mem = new Memory((i) => i);

  common.dump(mem, 0x3f, [2, 3, 4, 6, 7, 8]);

  mem.copyForward(2, 6, 3);
  common.log('copy forward [2,3,4] --> [6,7,8]');

  common.dump(mem, 0x3f, [2, 3, 4, 6, 7, 8]);

  common.log();

  common.dump(mem, 0x3f, [10, 11, 12, 13]);

  mem.copyForward(10, 11, 4);
  common.log('copy forward [10,11,12,13] --> [11,12,13,14]');

  common.dump(mem, 0x3f, [10, 11, 12, 13]);
});

common.example('copy backward', () => {
  const mem = new Memory((i) => i);

  common.dump(mem, 0x3f, [2, 3, 4, 6, 7, 8]);

  mem.copyBackward(2, 6, 3);
  common.log('copy backward [2,3,4] --> [6,7,8]');

  common.dump(mem, 0x3f, [2, 3, 4, 6, 7, 8]);

  common.log();

  common.dump(mem, 0x3f, [10, 11, 12, 13]);

  mem.copyBackward(10, 11, 4);
  common.log('copy backward [10,11,12,13] --> [11,12,13,14]');

  common.dump(mem, 0x3f, [10, 11, 12, 13]);
});
