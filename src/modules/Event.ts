import { Address } from './Address';

/** All events. */
export type AllEvents = {
  /** Add memo. (no effect for memory) */
  MEMO: {
    type: 'MEMO';
    memo: string;
  };
  /** Read 8bit. */
  READ_8: {
    type: 'READ_8';
    address: Address;
    result: number;
  };
  /** Read 16bit. */
  READ_16: {
    type: 'READ_16';
    address: Address;
    result: number;
  };
  /** Write 8bit. */
  WRITE_8: {
    type: 'WRITE_8';
    value: number;
    address: Address;
  };
  /** Write 16bit. */
  WRITE_16: {
    type: 'WRITE_16';
    value: number;
    address: Address;
  };
  /** Fill. */
  FILL: {
    type: 'FILL';
    value: number;
    from: Address;
    to: Address;
  };
  /** Copy forward. (like Z80's LDI) */
  COPY_FORWARD: {
    type: 'COPY_FORWARD';
    src: Address;
    dest: Address;
    count: number;
  };
  /** Copy backward. (like Z80's LDD) */
  COPY_BACKWARD: {
    type: 'COPY_BACKWARD';
    src: Address;
    dest: Address;
    count: number;
  };
};

/** Event. */
export type Event = AllEvents[keyof AllEvents];

/** Event types. */
export type EventType = Event['type'];
