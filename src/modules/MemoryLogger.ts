import { MemoryListener } from './MemoryListener';
import { Event } from './Event';

type Log = { event: Event; timestamp: number };

/**
 * Recording all memory operations.
 * (simple `MemoryListener` implementations example)
 */
export class MemoryLogger extends MemoryListener {
  private readonly logs: Log[] = [];

  protected onAll(event: Event): void {
    this.logs.push({ event, timestamp: Date.now() });
  }

  /**
   * Return all logs.
   *
   * @param cleanup If set true, clean up logs.
   */
  public getLog(cleanup = true): Log[] {
    const result = [...this.logs];

    if (cleanup) {
      while (this.logs.length > 0) this.logs.pop();
    }

    return result;
  }
}
