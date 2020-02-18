import { AddressData, Address } from './Address';
import { Work, createWork } from './Work';
import { OffsetData, Offset } from './Offset';

type KeyDiff<X, Y> = X extends Y ? never : X;
type Diff<X, Y extends object> = Pick<X, KeyDiff<keyof X, keyof Y>>;

export const utils = {
  /**
   * Create name and Address as key-value object.
   *
   * @param values key and value.
   */
  createAddressMap<T extends { [key: string]: AddressData | number }>(
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
  },

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
   */
  createAddressWorkMap<T extends { [key: string]: number }>(
    start: number | AddressData,
    values: T,
  ): { [P in keyof T]: Address } & Work<Address> {
    const s = typeof start === 'number' ? start : start.address;

    let offset = s;

    const keys = Object.keys(values) as (keyof T)[];
    const result: { [P in keyof T]: Address } = Object.create(null);

    keys.forEach((k) => {
      const v = values[k] as number;

      result[k] = new Address(k as string, offset);

      offset += v;
    });

    return {
      ...result,
      ...createWork(
        (x) => new Address(x, s),
        (x) => new Address(x, offset - 1),
        (x) => new Address(x, offset),
        offset - s,
      ),
    };
  },

  /**
   * Create name and Offset as key-value object.
   *
   * @param values key and value.
   */
  createOffsetMap<T extends { [key: string]: number }>(
    values: T,
  ): { [P in keyof T]: Offset } {
    const keys = Object.keys(values) as (keyof T)[];
    const result: { [P in keyof T]: Offset } = Object.create(null);

    keys.forEach((k) => {
      const v = values[k] as OffsetData | number;

      result[k] = new Offset(k as string, typeof v === 'number' ? v : v.offset);
    });

    return { ...result };
  },

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
  createOffsetWorkMap<T extends { [key: string]: number }>(
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
  },

  /**
   * Create address map from base address and offset map.
   *
   * @param base base address.
   * @param map offset map.
   */
  createAddressMapFromOffsetMap<T extends { [key: string]: Offset }>(
    base: Address,
    map: T,
  ): Diff<{ [key in keyof T]: Address }, Work<Address>> {
    const result: { [key in keyof T]: Address } = Object.create(null);

    const keys = Object.keys(map) as (keyof T)[];

    keys.forEach((key) => {
      result[key] = base.offset(map[key]);
    });

    return { ...result };
  },
};
