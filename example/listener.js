/* eslint-disable class-methods-use-this */
const common = require('./common');

const sim = require('..');

class MyListener extends sim.MemoryListener {
  onAll(e) {
    console.debug(`ALL (${e.type})`);
  }

  onMemo(e) {
    console.debug('');
    console.debug(`# ${e.memo}`);
    console.debug('');
  }

  onRead8(e) {
    console.debug(e.type, { address: e.address.format(), result: e.result });
  }

  onRead16(e) {
    console.debug(e.type, { address: e.address.format(), result: e.result });
  }

  onWrite8(e) {
    console.debug(e.type, { value: e.value, address: e.address.format() });
  }

  onWrite16(e) {
    console.debug(e.type, { value: e.value, address: e.address.format() });
  }

  onFill(e) {
    console.debug(e.type, {
      value: e.value,
      from: e.from.format(),
      to: e.to.format(),
    });
  }

  onCopyForward(e) {
    console.debug(e.type, {
      src: e.src.format(),
      dest: e.dest.format(),
      count: e.count,
    });
  }

  onCopyBackward(e) {
    console.debug(e.type, {
      src: e.src.format(),
      dest: e.dest.format(),
      count: e.count,
    });
  }
}

common.example('listener', () => {
  const mem = new sim.Memory();
  const listener = new MyListener();
  const base = new sim.Address('_', 0);

  mem.addListener(listener);

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
});
