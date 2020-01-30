const common = require('./common');

const sim = require('..');

const writeFormatted = (method, value) => {
  const v = +value;

  console.debug(`${value.padStart(8)} --> [${sim.formatters[method](v)}]`);
};

common.example('formatters.hex8', () => {
  writeFormatted('hex8', '0x1');
  writeFormatted('hex8', '-0x1');
  writeFormatted('hex8', '0x12');
  writeFormatted('hex8', '-0x12');
  writeFormatted('hex8', '0xc');
  writeFormatted('hex8', '-0xc');
  writeFormatted('hex8', '0xcd');
  writeFormatted('hex8', '-0xcd');
});

common.example('formatters.hex16', () => {
  writeFormatted('hex16', '0x1');
  writeFormatted('hex16', '-0x1');
  writeFormatted('hex16', '0x1234');
  writeFormatted('hex16', '-0x1234');
  writeFormatted('hex16', '0xc');
  writeFormatted('hex16', '-0xc');
  writeFormatted('hex16', '0xcdef');
  writeFormatted('hex16', '-0xcdef');
});

common.example('formatters.dec8', () => {
  writeFormatted('dec8', '1');
  writeFormatted('dec8', '-1');
  writeFormatted('dec8', '123');
  writeFormatted('dec8', '-123');
});

common.example('formatters.dec16', () => {
  writeFormatted('dec16', '1');
  writeFormatted('dec16', '-1');
  writeFormatted('dec16', '54321');
  writeFormatted('dec16', '-54321');
});
