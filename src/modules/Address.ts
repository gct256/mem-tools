import { formatters } from './formatters';

/* eslint-disable no-underscore-dangle */
const __FIRST__ = '__FIRST__';
const __LAST__ = '__LAST__';
const __NEXT__ = '__NEXT__';
const __SIZE__ = '__SIZE__';
/* eslint-enable */

/** Object interface for named address. */
export type AddressData = {
  /** Name for address. */
  readonly name: string;
  /** Address. (== baseAddress + addressOffset) */
  readonly address: number;
  /** Base address. */
  readonly baseAddress: number;
  /** Offset for address. */
  readonly addressOffset: number;
  /** Anonymous (no named) flag. */
  readonly anonymous: boolean;
};

/** Named address class. */
export class Address implements AddressData {
  public readonly name: string;
  public readonly address: number;
  public readonly baseAddress: number;
  public readonly addressOffset: number;
  public readonly anonymous: boolean;

  /**
   * Create named address object.
   *
   * @param name If `undefined` is set, set anonymous flag to true.
   * @param baseAddress
   * @param addressOffset
   */
  public constructor(
    name: string | undefined,
    baseAddress: number | AddressData,
    addressOffset: number | AddressData = 0,
  ) {
    if (typeof baseAddress === 'number') {
      this.baseAddress = baseAddress & 0xffff;
    } else {
      this.baseAddress = baseAddress.address;
    }

    if (typeof addressOffset === 'number') {
      this.addressOffset = Number.isFinite(addressOffset) ? addressOffset : 0;
    } else {
      this.addressOffset = addressOffset.address;
    }

    this.address = (this.baseAddress + this.addressOffset) & 0xffff;

    if (name === undefined) {
      this.name = `<anonymous ${formatters.hex16(this.address)}>`;
      this.anonymous = true;
    } else {
      this.name = name;
      this.anonymous = false;
    }
  }

  /**
   * Return formatted string of address.
   */
  public format(delimiter = ' ; '): string {
    if (this.addressOffset === 0) {
      return `${formatters.hex16(this.address)}${delimiter}${this.name}`;
    }

    const sign = this.addressOffset > 0 ? '+' : '-';
    const o = formatters.hex16(Math.abs(this.addressOffset));

    return `${formatters.hex16(this.address)}${delimiter}${
      this.name
    } ${sign} ${o} (${formatters.hex16(this.baseAddress)} ${sign} ${o})`;
  }

  /**
   * Create new address ojbect from baseAddress of this object with new offset.
   *
   * @param addressOffset new offset.
   */
  public offset(addressOffset: number | AddressData): Address {
    if (typeof addressOffset !== 'number') {
      return this.offset(addressOffset.address);
    }

    if (addressOffset === this.addressOffset) return this;

    return new Address(this.name, this.baseAddress, addressOffset);
  }

  /**
   * Create address object from data.
   *
   * @param data
   */
  public static of(data: AddressData): Address {
    return new Address(
      data.anonymous ? undefined : data.name,
      data.baseAddress,
      data.addressOffset,
    );
  }

  /**
   * Create name and Address as key-value object.
   *
   * @param values key and value.
   */
  public static createDict<T extends { [key: string]: AddressData | number }>(
    values: T,
  ): { [P in keyof T]: Address } {
    const keys = Object.keys(values) as (keyof T)[];
    const result: { [P in keyof T]: Address } = Object.create(null);

    keys.forEach((k) => {
      const v = values[k] as AddressData | number;

      result[k] = new Address(
        k as string,
        typeof v === 'number' ? v : v.address,
      );
    });

    return { ...result };
  }

  /**
   * Create name and Address as key-value object for work area.
   * Append utility labels.
   * - __FIRST__: first address of work area.
   * - __LAST__: last address of work area.
   * - __NEXT__: next memory address.
   * - __SIZE__: count of work arae. (number)
   *
   * @param start start address.
   * @param names Array of [name, size]
   */
  public static createWork<T extends string>(
    start: number | AddressData,
    names: [T, number][],
  ): { [K in T]: Address } & {
    [__FIRST__]: Address;
    [__LAST__]: Address;
    [__NEXT__]: Address;
    [__SIZE__]: number;
  } {
    const s = typeof start === 'number' ? start : start.address;

    let offset = s;

    const result = names.reduce((prev, current) => {
      // eslint-disable-next-line no-param-reassign
      prev[current[0]] = new Address(current[0], offset);
      offset += current[1];

      return prev;
    }, Object.create(null));

    return {
      ...result,
      [__FIRST__]: new Address(__FIRST__, s),
      [__LAST__]: new Address(__LAST__, offset - 1),
      [__NEXT__]: new Address(__NEXT__, offset),
      [__SIZE__]: offset - s,
    };
  }
}
