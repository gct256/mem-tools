import { formatters } from './formatters';
import { Work } from './Work';

const format = (offset: number, delimiter = ' '): string => {
  if (offset < 0) {
    return `-${delimiter}${formatters.hex16(0x10000 - offset)}`;
  }

  return `+${delimiter}${formatters.hex16(offset)}`;
};

/** Object interface for named offset. */
export type OffsetData = {
  /** Name for offset. */
  readonly name: string;
  /** Offset value. */
  readonly offset: number;
  /** Anonymous (no named) flag. */
  readonly anonymous: boolean;
};

/** Named offset class. */
export class Offset implements OffsetData {
  public readonly name: string;
  public readonly offset: number;
  public readonly anonymous: boolean;

  /**
   * Create named offset object.
   *
   * @param name If `undefined` is set, set anonymous flag to true.
   * @param offset
   */
  public constructor(name: string | undefined, offset: number) {
    const o = Number.isFinite(offset) ? +offset : 0;

    if (name === undefined) {
      this.anonymous = true;
      this.name = `${format(o)}`;
    } else {
      this.anonymous = false;
      this.name = name;
    }
    this.offset = o;
  }

  /**
   * Return formatted string of offset.
   */
  public format(): string {
    if (this.anonymous) return this.name;

    return `+ ${this.name}<${format(this.offset, '')}>`;
  }

  /**
   * Return formatted string of offset's name.
   */
  public formatName(): string {
    if (this.anonymous) return this.name;

    return `+ ${this.name}`;
  }

  /**
   * Return formatted string of offset's value.
   */
  public formatOffset(): string {
    return format(this.offset);
  }

  /**
   * Create offset object from data.
   *
   * @param data
   */
  public static of(data: OffsetData): Offset {
    return new Offset(data.anonymous ? undefined : data.name, data.offset);
  }

  /**
   * Create name and Offset as key-value object.
   *
   * @param values key and value.
   * @deprecated use utils.createOffsetMap.
   */
  public static createDict<T extends { [key: string]: number }>(
    _values: T,
  ): { [P in keyof T]: Offset } {
    throw new Error(
      'Offset.createDict is deperecated. use utils.createOffsetMap.',
    );
  }

  /**
   * Create name and Offset as key-value object for work area.
   * Append utility labels.
   * - __FIRST__: first offset of work area.
   * - __LAST__: last offset of work area.
   * - __NEXT__: next offset.
   * - __SIZE__: count of work arae. (number)
   *
   * @param values key and value.
   * @deprecated use utils.createOffsetWorkMap.
   */
  public static createWork<T extends { [key: string]: number }>(
    _values: T,
  ): { [P in keyof T]: Offset } & Work<Offset> {
    throw new Error(
      'Offset.createWork is deperecated. use utils.createOffsetWorkMap.',
    );
  }
}
