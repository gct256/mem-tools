# mem-tools

Tools for simulate retro computer programing with TypeScript.

## Memory

- Utility class of 64KB memory model for TypeScript.
- Supports read, write, fill and copy.

### MemoryListener

- Listeners can receive events on memory operations.

## Address & Offset & utils

- Useful class & utility for named addresses.
- Can be used like assembler's labels.

```typescript
const FOO = new Address('FOO', 0x1234);
const BAR = new Offset('BAR', 0x12);

mem.readInt8(FOO); // read from 0x1234
mem.readInt8(FOO.offset(-0x12)); // read from 0x1234 - 0x12 = 0x1222
mem.readInt8(FOO.offset(BAR)); // read from 0x1234 + 0x12 = 0x1246

const MAP = utils.createAddressMap({
  BAR: 0x2345,
  BAZ: 0x3456,
});

mem.readInt8(MAP.BAR); // read from 0x2345
mem.readInt8(MAP.BAZ); // read from 0x3456

const WORK_MAP = utils.createAddressWorkMap(0xcb00, [
  ['QUX', 2],
  ['QUUX', 1],
  ['QUUUX', 1],
]);

mem.writeInt16(0x1234, WORK_MAP.QUX); // write to 0xcb00
mem.writeInt8(0x56, WORK_MAP.QUUX); // write to 0xcb02
mem.writeInt8(0x78, WORK_MAP.QUUUX); // write to 0xcb03
mem.fill(0, WORK_MAP.__FIRST__, WORK_MAP.__LAST__); // fill 0xcb00 - 0xcb03
```

## formatters

- Number formatters for 8bit/16bit decimal/dexadecimal.
