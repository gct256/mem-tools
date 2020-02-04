const common = require('./common');

const sim = require('..');

common.example('event', () => {
  const mem = new sim.Memory((i) => i);

  mem.addListener({
    read8(address, result) {
      console.debug(
        `read ${sim.formatters.hex8(result)} from ${address.format()}`,
      );
    },
    read16(address, result) {
      console.debug(
        `read ${sim.formatters.hex16(result)} from ${address.format()}`,
      );
    },
    write8(value, address) {
      console.debug(
        `write ${sim.formatters.hex8(value)} to ${address.format()}`,
      );
    },
    write16(value, address) {
      console.debug(
        `write ${sim.formatters.hex16(value)} to ${address.format()}`,
      );
    },
    fill(value, from, to) {
      console.debug(
        `fill ${sim.formatters.hex8(
          value,
        )} from ${from.format()} to ${to.format()}`,
      );
    },
    copyForward(src, dest, count) {
      console.debug(
        `copy forward ${count} from ${src.format()} to ${dest.format()}`,
      );
    },
    copyBackward(src, dest, count) {
      console.debug(
        `copy backward ${count} from ${src.format()} to ${dest.format()}`,
      );
    },
    comment(comment) {
      console.debug(`comment: ${comment}`);
    },
  });

  const FOO = new sim.Address('FOO', 0x34);
  const BAR = new sim.Address('BAR', 0x56);

  mem.readInt8(0x12);
  mem.readInt8(FOO);
  mem.readInt16(0x12);
  mem.readInt16(FOO);
  mem.writeInt8(0x42, 0x12);
  mem.writeInt8(0x43, FOO);
  mem.writeInt16(0x4235, 0x12);
  mem.writeInt16(0x4345, FOO);
  mem.fill(0x42, FOO, BAR);
  mem.copyForward(FOO, BAR, 0x12);
  mem.copyBackward(FOO, BAR, 0x12);
  mem.comment('Comment');
});
