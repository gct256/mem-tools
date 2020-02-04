import { MemoryListener } from './MemoryListener';

const emptyListener: MemoryListener = {
  read8() {
    //
  },
  read16() {
    //
  },
  write8() {
    //
  },
  write16() {
    //
  },
  fill() {
    //
  },
  copyForward() {
    //
  },
  copyBackward() {
    //
  },
  comment() {
    //
  },
};

/** Internal event emitter. */
export class Emitter {
  private listeners: MemoryListener[] = [];

  /**
   * Add listener.
   *
   * @param listener
   */
  public addListener(listener: Partial<MemoryListener>): void {
    this.listeners.push({ ...emptyListener, ...listener });
  }

  protected emitRead8(...args: Parameters<MemoryListener['read8']>): void {
    this.listeners.forEach(({ read8 }) => read8(...args));
  }

  protected emitRead16(...args: Parameters<MemoryListener['read16']>): void {
    this.listeners.forEach(({ read16 }) => read16(...args));
  }

  protected emitWrite8(...args: Parameters<MemoryListener['write8']>): void {
    this.listeners.forEach(({ write8 }) => write8(...args));
  }

  protected emitWrite16(...args: Parameters<MemoryListener['write16']>): void {
    this.listeners.forEach(({ write16 }) => write16(...args));
  }

  protected emitFill(...args: Parameters<MemoryListener['fill']>): void {
    this.listeners.forEach(({ fill }) => fill(...args));
  }

  protected emitCopyForward(
    ...args: Parameters<MemoryListener['copyForward']>
  ): void {
    this.listeners.forEach(({ copyForward }) => copyForward(...args));
  }

  protected emitCopyBackward(
    ...args: Parameters<MemoryListener['copyBackward']>
  ): void {
    this.listeners.forEach(({ copyBackward }) => copyBackward(...args));
  }

  protected emitComment(...args: Parameters<MemoryListener['comment']>): void {
    this.listeners.forEach(({ comment }) => comment(...args));
  }
}
