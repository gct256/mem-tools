import { formatters } from './formatters';
import { OffsetData, Offset } from './Offset';
import { Work } from './Work';

/** Object interface for named address. */
export type AddressData = {
  /** Name for address. */
  readonly name: string;
  /** Address. (== baseAddress + addressOffset.offset) */
  readonly address: number;
  /** Base address. */
  readonly baseAddress: number;
  /** Offset for address. */
  readonly addressOffset: OffsetData;
  /** Anonymous (no named) flag. */
  readonly anonymous: boolean;
};

/** Named address class. */
export class Address implements AddressData {
  public readonly name: string;
  public readonly address: number;
  public readonly baseAddress: number;
  public readonly addressOffset: Offset;
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
    addressOffset: number | OffsetData = 0,
  ) {
    if (typeof baseAddress === 'number') {
      this.baseAddress = baseAddress & 0xffff;
    } else {
      this.baseAddress = baseAddress.address;
    }

    if (typeof addressOffset === 'number') {
      this.addressOffset = new Offset(
        undefined,
        Number.isFinite(addressOffset) ? addressOffset : 0,
      );
    } else {
      this.addressOffset = Offset.of(addressOffset);
    }

    this.address = (this.baseAddress + this.addressOffset.offset) & 0xffff;

    if (name === undefined) {
      this.name = `<anonymous ${formatters.hex16(this.baseAddress)}>`;
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
    if (this.addressOffset.anonymous) {
      if (this.addressOffset.offset === 0) {
        return `${formatters.hex16(this.address)}${delimiter}${this.name}`;
      }

      const sign = this.addressOffset.offset > 0 ? '+' : '-';
      const o = formatters.hex16(Math.abs(this.addressOffset.offset));

      return `${formatters.hex16(this.address)}${delimiter}${
        this.name
      } ${sign} ${o} (${formatters.hex16(this.baseAddress)} ${sign} ${o})`;
    }

    return `${formatters.hex16(this.address)}${delimiter}${
      this.name
    } ${this.addressOffset.formatName()} (${formatters.hex16(
      this.baseAddress,
    )} ${this.addressOffset.formatOffset()})`;
  }

  /**
   * Create new address ojbect from baseAddress of this object with new offset.
   *
   * @param addressOffset new offset.
   */
  public offset(addressOffset: number | Offset): Address {
    if (typeof addressOffset === 'number') {
      return this.offset(new Offset(undefined, addressOffset));
    }

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
   * @deprecated use utils.createAddressMap
   */
  public static createDict<T extends { [key: string]: AddressData | number }>(
    _values: T,
  ): { [P in keyof T]: Address } {
    throw Error(
      'Address.createDict is deperecated. use utils.createAddressMap.',
    );
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
   * @param values key and value.
   * @deprecated use utils.createAddressWorkMap
   */
  public static createWork<T extends { [key: string]: number }>(
    _start: number | AddressData,
    _values: T,
  ): { [P in keyof T]: Address } & Work<Address> {
    throw Error(
      'Address.createWork is deperecated. use utils.createAddressWorkMap.',
    );
  }
}
