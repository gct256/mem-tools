const common = require('./common');

const sim = require('..');

common.example('single address', () => {
  common.log(new sim.Address('FOO', 0x1234).format());
});

common.example('offset', () => {
  const FOO = new sim.Address('FOO', 0x1234);

  common.log(
    FOO.offset(0x12).format(),
    FOO.offset(-0x12).format(),
    FOO.offset(0).format(),
  );
});

common.example('anonymous', () => {
  common.log(
    new sim.Address(undefined, 0x1234).format(),
    new sim.Address(undefined, 0x1234).offset(0x12).format(),
    new sim.Address(undefined, 0x1234).offset(-0x12).format(),
  );
});

common.example('createDict', () => {
  const DICT = sim.Address.createDict({
    FOO: 0x1234,
    BAR: 0x2345,
    BAZ: 0x3456,
  });

  common.log(
    `Address.createDict({
  FOO: 0x1234,
  BAR: 0x2345,
  BAZ: 0x3456,
})`,
    '↓',
    DICT,
  );
});

common.example('createWork', () => {
  const WORK = sim.Address.createWork(0x1234, [
    ['FOO', 2],
    ['BAR', 1],
    ['BAZ', 1],
  ]);

  common.log(
    `Address.createWork(0x1234, [
  ['FOO', 2],
  ['BAR', 1],
  ['BAZ', 1],
])`,
    '↓',
    WORK,
  );
});
