const common = require('./common');

const sim = require('..');

common.example('logger', () => {
  const mem = new sim.Memory();
  const logger = new sim.MemoryLogger();
  const base = new sim.Address('_', 0);

  mem.addListener(logger);

  mem.memo('read');

  mem.readInt8(base.offset(1));
  mem.readUInt8(base.offset(2));
  mem.readInt16(base.offset(3));
  mem.readUInt16(base.offset(4));

  mem.memo('write');

  mem.writeInt8(5, base.offset(6));
  mem.writeInt16(7, base.offset(8));

  mem.memo('fill');

  mem.fill(9, base.offset(10), base.offset(11));

  mem.memo('copy');

  mem.copyForward(base.offset(12), base.offset(13), 14);
  mem.copyBackward(base.offset(15), base.offset(16), 17);

  common.log(logger.getLog());
});
