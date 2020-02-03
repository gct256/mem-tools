const common = require('./common');

const sim = require('..');

common.example('offset', () => {
  common.log(
    new sim.Offset('FOO', 0x12).format(),
    new sim.Offset('BAR', -0x12).format(),
    new sim.Offset('BAZ', 0).format(),
  );
});

common.example('anonymous', () => {
  common.log(
    new sim.Offset(undefined, 0x12).format(),
    new sim.Offset(undefined, -0x12).format(),
    new sim.Offset(undefined, 0).format(),
  );
});

common.example('createWork', () => {
  const WORK = sim.Offset.createWork({
    FOO: 1,
    BAR: 1,
    BAZ: 2,
  });
  const QUX = new sim.Offset('QUX', -10);
  const address = new sim.Address('QUUX', 0xcb00);

  common.log(WORK);
  common.log(
    address.offset(WORK.FOO),
    address.offset(WORK.BAR),
    address.offset(WORK.BAZ),
    address.offset(QUX),
  );
});
