/* eslint-disable class-methods-use-this */
import { AllEvents, Event } from './Event';

/** Listener for memory operations. */
export class MemoryListener {
  public enabled = true;

  public handleEvent(event: Event, buffer: Buffer): void {
    if (!this.enabled) return;

    switch (event.type) {
      case 'MEMO':
        this.onAll(event, buffer);
        this.onMemo(event, buffer);
        break;

      case 'READ_8':
        this.onAll(event, buffer);
        this.onRead8(event, buffer);
        break;

      case 'READ_16':
        this.onAll(event, buffer);
        this.onRead16(event, buffer);
        break;

      case 'WRITE_8':
        this.onAll(event, buffer);
        this.onWrite8(event, buffer);
        break;

      case 'WRITE_16':
        this.onAll(event, buffer);
        this.onWrite16(event, buffer);
        break;

      case 'FILL':
        this.onAll(event, buffer);
        this.onFill(event, buffer);
        break;

      case 'COPY_FORWARD':
        this.onAll(event, buffer);
        this.onCopyForward(event, buffer);
        break;

      case 'COPY_BACKWARD':
        this.onAll(event, buffer);
        this.onCopyBackward(event, buffer);
        break;

      default:
    }
  }

  protected onAll(_event: Event, _buffer: Buffer): void {
    //
  }

  protected onMemo(_event: AllEvents['MEMO'], _buffer: Buffer): void {
    //
  }

  protected onRead8(_event: AllEvents['READ_8'], _buffer: Buffer): void {
    //
  }

  protected onRead16(_event: AllEvents['READ_16'], _buffer: Buffer): void {
    //
  }

  protected onWrite8(_event: AllEvents['WRITE_8'], _buffer: Buffer): void {
    //
  }

  protected onWrite16(_event: AllEvents['WRITE_16'], _buffer: Buffer): void {
    //
  }

  protected onFill(_event: AllEvents['FILL'], _buffer: Buffer): void {
    //
  }

  protected onCopyForward(
    _event: AllEvents['COPY_FORWARD'],
    _buffer: Buffer,
  ): void {
    //
  }

  protected onCopyBackward(
    _event: AllEvents['COPY_BACKWARD'],
    _buffer: Buffer,
  ): void {
    //
  }
}
