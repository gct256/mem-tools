# mem-tools

Tools for retro computer programing.

## Memory

- Utility class of 64KB memory model for TypeScript.
- Supports read, write, fill and copy.

### MemoryListener

- Listeners can receive events on memory operations.

### MemoryLogger

- Simple implementation of `MemoryListener`.

## Address

- Useful class & utility for named addresses.
- Can be used like assembler's labels.

```typescript
const FOO = new Address('FOO', 0x1234);

mem.readInt8(FOO); // read from 0x1234
mem.readInt8(FOO.offset(-2)); // read from 0x1234 - 2 = 0x1232

const DICT = Address.createDicr({
  BAR: 0x2345,
  BAZ: 0x3456,
});

mem.readInt8(DICT.BAR); // read from 0x2345
mem.readInt8(DICT.BAZ); // read from 0x3456

const WORK = Address.createWork(0xcb00, [
  ['QUX', 2],
  ['QUUX', 1],
  ['QUUUX', 1],
]);

mem.writeInt16(0x1234, WORK.QUX); // write to 0xcb00
mem.writeInt8(0x56, WORK.QUUX); // write to 0xcb02
mem.writeInt8(0x78, WORK.QUUUX); // write to 0xcb03
mem.fill(0, WORK.__FIRST__, WORK.__LAST__); // fill 0xcb00 - 0xcb03
```

## formatters

- Number formatters for 8bit/16bit decimal/dexadecimal.
