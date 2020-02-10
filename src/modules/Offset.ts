import { Work, createWork } from './Work';
import { formatters } from './formatters';

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
    if (name === undefined) {
      this.anonymous = true;
      this.name = `${format(offset)}`;
    } else {
      this.anonymous = false;
      this.name = name;
    }
    this.offset = offset;
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
   */
  public static createDict<T extends { [key: string]: number }>(
    values: T,
  ): { [P in keyof T]: Offset } {
    const keys = Object.keys(values) as (keyof T)[];
    const result: { [P in keyof T]: Offset } = Object.create(null);

    keys.forEach((k) => {
      const v = values[k] as OffsetData | number;

      result[k] = new Offset(k as string, typeof v === 'number' ? v : v.offset);
    });

    return { ...result };
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
   */
  public static createWork<T extends { [key: string]: number }>(
    values: T,
  ): { [P in keyof T]: Offset } & Work<Offset> {
    let before = 0;
    let offset = 0;

    const keys = Object.keys(values) as (keyof T)[];
    const result: { [P in keyof T]: Offset } = Object.create(null);

    keys.forEach((k) => {
      result[k] = new Offset(k as string, offset);
      before = offset;
      offset += values[k] as number;
    });

    return {
      ...result,
      ...createWork(
        (x) => new Offset(x, 0),
        (x) => new Offset(x, before),
        (x) => new Offset(x, offset),
        keys.length,
      ),
    };
  }
}
