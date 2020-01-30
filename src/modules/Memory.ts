import { Emitter } from './Emitter';
import { Address } from './Address';

const getAddress = (address: Address | number): Address =>
  address instanceof Address ? address : new Address(undefined, address);

/** Utility class of 64KB memory model. */
export class Memory extends Emitter {
  private buffer: Buffer;

  /**
   * Create object.
   *
   * @param initializer Callback of generate initial value. If not set, fill 0 all.
   */
  public constructor(initializer?: (address: number) => number) {
    super();

    this.buffer = Buffer.alloc(0x10000);

    if (initializer) {
      for (let i = 0; i < 0x10000; i += 1) {
        this.buffer.writeUInt8(initializer(i) & 0xff, i);
      }
    } else {
      this.buffer.fill(0, 0, 0x10000);
    }
  }

  /**
   * Return memory as node's Buffer.
   */
  public getBuffer(): Buffer {
    return Buffer.from(this.buffer);
  }

  /**
   * Add memo. no effect to memory.
   *
   * @param memo
   */
  public memo(memo: string): void {
    this.emit(
      {
        type: 'MEMO',
        memo,
      },
      this.getBuffer(),
    );
  }

  /**
   * Read 1 byte as signed number.
   *
   * @param address
   */
  public readInt8(address: Address | number): number {
    const addr = getAddress(address);
    const result = this.buffer.readInt8(addr.address);

    this.emit(
      {
        type: 'READ_8',
        address: addr,
        result,
      },
      this.getBuffer(),
    );

    return result;
  }

  /**
   * Read 1 byte as unsigned number.
   *
   * @param address
   */
  public readUInt8(address: Address | number): number {
    const addr = getAddress(address);
    const result = this.buffer.readUInt8(addr.address);

    this.emit(
      {
        type: 'READ_8',
        address: addr,
        result,
      },
      this.getBuffer(),
    );

    return result;
  }

  /**
   * Read 2 bytes as signed number. Always use little endian byte order.
   *
   * @param address
   */
  public readInt16(address: Address | number): number {
    const addr = getAddress(address);
    const result = this.buffer.readInt16LE(addr.address);

    this.emit(
      {
        type: 'READ_16',
        address: addr,
        result,
      },
      this.getBuffer(),
    );

    return result;
  }

  /**
   * Read 2 bytes as unsigned number. Always use little endian byte order.
   *
   * @param address 位置
   */
  public readUInt16(address: Address | number): number {
    const addr = getAddress(address);
    const result = this.buffer.readUInt16LE(addr.address);

    this.emit(
      {
        type: 'READ_16',
        address: addr,
        result,
      },
      this.getBuffer(),
    );

    return result;
  }

  /**
   * Write 1 byte.
   *
   * @param value
   * @param address
   */
  public writeInt8(value: number, address: Address | number): void {
    const addr = getAddress(address);

    this.buffer.writeUInt8(value & 0xff, addr.address);

    this.emit(
      {
        type: 'WRITE_8',
        value,
        address: addr,
      },
      this.getBuffer(),
    );
  }

  /**
   * Write 2 bytes. Always use little endian byte order.
   *
   * @param value
   * @param address
   */
  public writeInt16(value: number, address: Address | number): void {
    const addr = getAddress(address);

    this.buffer.writeUInt16LE(value & 0xffff, addr.address);

    this.emit(
      {
        type: 'WRITE_16',
        value,
        address: addr,
      },
      this.getBuffer(),
    );
  }

  /**
   * Fill memory with value.
   * If FROM address larger than TO address, no effect to memory.
   *
   * @param value
   * @param from
   * @param to
   */
  public fill(
    value: number,
    from: Address | number,
    to: Address | number,
  ): number {
    const f = getAddress(from);
    const t = getAddress(to);

    if (f.address <= t.address) {
      this.buffer.fill(value & 0xff, f.address, t.address + 1);
    }

    this.emit(
      {
        type: 'FILL',
        value,
        from: f,
        to: t,
      },
      this.getBuffer(),
    );

    return Math.max(0, t.address - f.address + 1);
  }

  /**
   * Copy memory with forward incremation.
   *
   * @param src
   * @param dest
   * @param count
   */
  public copyForward(
    src: Address | number,
    dest: Address | number,
    count: number,
  ): void {
    const s = getAddress(src);
    const d = getAddress(dest);

    for (let i = 0; i < count; i += 1) {
      this.buffer.writeUInt8(
        this.buffer.readUInt8(s.address + i),
        d.address + i,
      );
    }

    this.emit(
      {
        type: 'COPY_FORWARD',
        src: s,
        dest: d,
        count,
      },
      this.getBuffer(),
    );
  }

  /**
   * Copy memory with backward incremation.
   *
   * @param src
   * @param dest
   * @param count
   */
  public copyBackward(
    src: Address | number,
    dest: Address | number,
    count: number,
  ): void {
    const s = getAddress(src);
    const d = getAddress(dest);

    for (let i = count - 1; i >= 0; i -= 1) {
      this.buffer.writeUInt8(
        this.buffer.readUInt8(s.address + i),
        d.address + i,
      );
    }

    this.emit(
      {
        type: 'COPY_BACKWARD',
        src: s,
        dest: d,
        count,
      },
      this.getBuffer(),
    );
  }
}
