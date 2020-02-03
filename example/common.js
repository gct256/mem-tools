const chalk = require('chalk');
const { hexdump, hexdumpUtils } = require('@gct256/hexdump');

const sim = require('..');

const convert = (x) => {
  if (x === null || x === undefined || typeof x !== 'object') return x;

  if (x instanceof sim.Address) return x.format();

  if (x instanceof sim.Offset) return x.format();

  if (Array.isArray(x)) return x.map(convert);

  return Object.keys(x).reduce(
    (prev, k) => ({ ...prev, [k]: convert(x[k]) }),
    {},
  );
};

const example = (title, callback) => {
  console.debug('');
  console.debug(`### ${title}`);
  console.debug('');
  callback();
};

const log = (...values) => {
  console.debug('-');
  values.forEach((x) =>
    Array.isArray(x) ? console.debug(...convert(x)) : console.debug(convert(x)),
  );
  console.debug('-');
};

const dump = (memory, end = 0x3f, marks = []) => {
  console.debug(
    hexdump(memory.getBuffer(), {
      end,
      borders: {
        header: hexdumpUtils.DEFAULT_RULER,
      },
      decorators: {
        hex(s, { address }) {
          return marks.includes(address) ? chalk.inverse(s) : s;
        },
      },
    }).join('\n'),
  );
};

module.exports = { example, log, dump };
