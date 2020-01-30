import { Event } from './Event';
import { MemoryListener } from './MemoryListener';

/** Internal event emitter. */
export class Emitter {
  private listen = true;
  private listeners: MemoryListener[] = [];

  /**
   * Add listener.
   *
   * @param listener
   */
  public addListener(listener: MemoryListener): void {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  /**
   * Remove listener.
   *
   * @param listener
   */
  public removeListener(listener: MemoryListener): void {
    const index = this.listeners.indexOf(listener);

    if (index >= 0) this.listeners.splice(index, 1);
  }

  /**
   * Remove all listeners.
   */
  public removeAllListeners(): void {
    while (this.listeners.length > 0) this.listeners.pop();
  }

  /**
   * Emit event.
   *
   * @param event
   * @param buffer node's Buffer of memory.
   */
  public emit(event: Event, buffer: Buffer): void {
    if (this.listen) {
      this.listeners.forEach((listener) =>
        listener.handleEvent({ ...event }, buffer),
      );
    }
  }

  /**
   * Enable event emission.
   */
  public enableEmission(): void {
    this.listen = true;
  }

  /**
   * Disable event emission.
   */
  public disableEmission(): void {
    this.listen = false;
  }
}
