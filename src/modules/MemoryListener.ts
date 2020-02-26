import { Address } from './Address';

/** Listener for memory operations. */
export type MemoryListener = {
  /** Call on read 8bit value. */
  read8(address: Address, result: number, buffer: Buffer): void;

  /** Call on read 16bit value. */
  read16(address: Address, result: number, buffer: Buffer): void;

  /** Call on write 8bit value. */
  write8(
    value: number,
    address: Address,
    before: number,
    after: number,
    buffer: Buffer,
  ): void;

  /** Call on write 16bit value. */
  write16(
    value: number,
    address: Address,
    before: number,
    after: number,
    buffer: Buffer,
  ): void;

  /** Call on fill. */
  fill(value: number, from: Address, to: Address, buffer: Buffer): void;

  /** Call on forward copy. */
  copyForward(src: Address, dest: Address, count: number, buffer: Buffer): void;

  /** Call on backward copy. */
  copyBackward(
    src: Address,
    dest: Address,
    count: number,
    buffer: Buffer,
  ): void;

  /** Call on comment. */
  comment(comment: string, buffer: Buffer): void;
};
