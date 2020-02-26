import { Address, Offset, utils } from '../src';

describe('constructor', () => {
  test('(string, number)', () => {
    expect(new Address('foo', 42)).toBeInstanceOf(Address);
    expect(new Address('foo', 42).address).toBe(42);
    expect(new Address('foo', 42).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', 42).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', 42).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', 42).addressOffset.offset).toBe(0);
    expect(new Address('foo', 42).anonymous).toBe(false);
    expect(new Address('foo', 42).baseAddress).toBe(42);
    expect(new Address('foo', 42).name).toBe('foo');
  });

  test('(string, not number)', () => {
    expect(new Address('foo', NaN)).toBeInstanceOf(Address);
    expect(new Address('foo', NaN).address).toBe(0);
    expect(new Address('foo', NaN).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', NaN).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', NaN).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', NaN).addressOffset.offset).toBe(0);
    expect(new Address('foo', NaN).anonymous).toBe(false);
    expect(new Address('foo', NaN).baseAddress).toBe(0);
    expect(new Address('foo', NaN).name).toBe('foo');

    expect(new Address('foo', Infinity)).toBeInstanceOf(Address);
    expect(new Address('foo', Infinity).address).toBe(0);
    expect(new Address('foo', Infinity).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', Infinity).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', Infinity).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', Infinity).addressOffset.offset).toBe(0);
    expect(new Address('foo', Infinity).anonymous).toBe(false);
    expect(new Address('foo', Infinity).baseAddress).toBe(0);
    expect(new Address('foo', Infinity).name).toBe('foo');

    expect(new Address('foo', -Infinity)).toBeInstanceOf(Address);
    expect(new Address('foo', -Infinity).address).toBe(0);
    expect(new Address('foo', -Infinity).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', -Infinity).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', -Infinity).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', -Infinity).addressOffset.offset).toBe(0);
    expect(new Address('foo', -Infinity).anonymous).toBe(false);
    expect(new Address('foo', -Infinity).baseAddress).toBe(0);
    expect(new Address('foo', -Infinity).name).toBe('foo');
  });

  test('(undefined, number)', () => {
    expect(new Address(undefined, 42)).toBeInstanceOf(Address);
    expect(new Address(undefined, 42).address).toBe(42);
    expect(new Address(undefined, 42).addressOffset).toBeInstanceOf(Offset);
    expect(new Address(undefined, 42).addressOffset.anonymous).toBe(true);
    expect(new Address(undefined, 42).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address(undefined, 42).addressOffset.offset).toBe(0);
    expect(new Address(undefined, 42).anonymous).toBe(true);
    expect(new Address(undefined, 42).baseAddress).toBe(42);
    expect(new Address(undefined, 42).name).toBe('<anonymous 002Aʰ>');
  });

  test('(undefined, not number)', () => {
    expect(new Address(undefined, NaN)).toBeInstanceOf(Address);
    expect(new Address(undefined, NaN).address).toBe(0);
    expect(new Address(undefined, NaN).addressOffset).toBeInstanceOf(Offset);
    expect(new Address(undefined, NaN).addressOffset.anonymous).toBe(true);
    expect(new Address(undefined, NaN).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address(undefined, NaN).addressOffset.offset).toBe(0);
    expect(new Address(undefined, NaN).anonymous).toBe(true);
    expect(new Address(undefined, NaN).baseAddress).toBe(0);
    expect(new Address(undefined, NaN).name).toBe('<anonymous 0000ʰ>');

    expect(new Address(undefined, Infinity)).toBeInstanceOf(Address);
    expect(new Address(undefined, Infinity).address).toBe(0);
    expect(new Address(undefined, Infinity).addressOffset).toBeInstanceOf(
      Offset,
    );
    expect(new Address(undefined, Infinity).addressOffset.anonymous).toBe(true);
    expect(new Address(undefined, Infinity).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address(undefined, Infinity).addressOffset.offset).toBe(0);
    expect(new Address(undefined, Infinity).anonymous).toBe(true);
    expect(new Address(undefined, Infinity).baseAddress).toBe(0);
    expect(new Address(undefined, Infinity).name).toBe('<anonymous 0000ʰ>');

    expect(new Address(undefined, -Infinity)).toBeInstanceOf(Address);
    expect(new Address(undefined, -Infinity).address).toBe(0);
    expect(new Address(undefined, -Infinity).addressOffset).toBeInstanceOf(
      Offset,
    );
    expect(new Address(undefined, -Infinity).addressOffset.anonymous).toBe(
      true,
    );
    expect(new Address(undefined, -Infinity).addressOffset.name).toBe(
      '+ 0000ʰ',
    );
    expect(new Address(undefined, -Infinity).addressOffset.offset).toBe(0);
    expect(new Address(undefined, -Infinity).anonymous).toBe(true);
    expect(new Address(undefined, -Infinity).baseAddress).toBe(0);
    expect(new Address(undefined, -Infinity).name).toBe('<anonymous 0000ʰ>');
  });

  test('(string, Address(name))', () => {
    const bar = new Address('bar', 43);

    expect(new Address('foo', bar)).toBeInstanceOf(Address);
    expect(new Address('foo', bar).address).toBe(43);
    expect(new Address('foo', bar).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', bar).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', bar).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', bar).addressOffset.offset).toBe(0);
    expect(new Address('foo', bar).anonymous).toBe(false);
    expect(new Address('foo', bar).baseAddress).toBe(43);
    expect(new Address('foo', bar).name).toBe('foo');
  });

  test('(string, Address(undefined))', () => {
    const bar = new Address(undefined, 43);

    expect(new Address('foo', bar)).toBeInstanceOf(Address);
    expect(new Address('foo', bar).address).toBe(43);
    expect(new Address('foo', bar).addressOffset).toBeInstanceOf(Offset);
    expect(new Address('foo', bar).addressOffset.anonymous).toBe(true);
    expect(new Address('foo', bar).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address('foo', bar).addressOffset.offset).toBe(0);
    expect(new Address('foo', bar).anonymous).toBe(false);
    expect(new Address('foo', bar).baseAddress).toBe(43);
    expect(new Address('foo', bar).name).toBe('foo');
  });

  test('(undefined, Address(name))', () => {
    const bar = new Address('bar', 43);

    expect(new Address(undefined, bar)).toBeInstanceOf(Address);
    expect(new Address(undefined, bar).address).toBe(43);
    expect(new Address(undefined, bar).addressOffset).toBeInstanceOf(Offset);
    expect(new Address(undefined, bar).addressOffset.anonymous).toBe(true);
    expect(new Address(undefined, bar).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address(undefined, bar).addressOffset.offset).toBe(0);
    expect(new Address(undefined, bar).anonymous).toBe(true);
    expect(new Address(undefined, bar).baseAddress).toBe(43);
    expect(new Address(undefined, bar).name).toBe('<anonymous 002Bʰ>');
  });

  test('(undefined, Address(undefined))', () => {
    const bar = new Address(undefined, 43);

    expect(new Address(undefined, bar)).toBeInstanceOf(Address);
    expect(new Address(undefined, bar).address).toBe(43);
    expect(new Address(undefined, bar).addressOffset).toBeInstanceOf(Offset);
    expect(new Address(undefined, bar).addressOffset.anonymous).toBe(true);
    expect(new Address(undefined, bar).addressOffset.name).toBe('+ 0000ʰ');
    expect(new Address(undefined, bar).addressOffset.offset).toBe(0);
    expect(new Address(undefined, bar).anonymous).toBe(true);
    expect(new Address(undefined, bar).baseAddress).toBe(43);
    expect(new Address(undefined, bar).name).toBe('<anonymous 002Bʰ>');
  });

  describe('with offset', () => {
    test('(string, number, number)', () => {
      expect(new Address('foo', 42, 43)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, 43).address).toBe(42 + 43);
      expect(new Address('foo', 42, 43).addressOffset).toBeInstanceOf(Offset);
      expect(new Address('foo', 42, 43).addressOffset.anonymous).toBe(true);
      expect(new Address('foo', 42, 43).addressOffset.name).toBe('+ 002Bʰ');
      expect(new Address('foo', 42, 43).addressOffset.offset).toBe(43);
      expect(new Address('foo', 42, 43).anonymous).toBe(false);
      expect(new Address('foo', 42, 43).baseAddress).toBe(42);
      expect(new Address('foo', 42, 43).name).toBe('foo');

      expect(new Address('foo', 42, -43)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, -43).address).toBe(0xffff);
      expect(new Address('foo', 42, -43).addressOffset).toBeInstanceOf(Offset);
      expect(new Address('foo', 42, -43).addressOffset.anonymous).toBe(true);
      expect(new Address('foo', 42, -43).addressOffset.name).toBe('- 002Bʰ');
      expect(new Address('foo', 42, -43).addressOffset.offset).toBe(-43);
      expect(new Address('foo', 42, -43).anonymous).toBe(false);
      expect(new Address('foo', 42, -43).baseAddress).toBe(42);
      expect(new Address('foo', 42, -43).name).toBe('foo');
    });

    test('(string, number, not number)', () => {
      expect(new Address('foo', 42, NaN)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, NaN).address).toBe(42 + 0);
      expect(new Address('foo', 42, NaN).addressOffset).toBeInstanceOf(Offset);
      expect(new Address('foo', 42, NaN).addressOffset.anonymous).toBe(true);
      expect(new Address('foo', 42, NaN).addressOffset.name).toBe('+ 0000ʰ');
      expect(new Address('foo', 42, NaN).addressOffset.offset).toBe(0);
      expect(new Address('foo', 42, NaN).anonymous).toBe(false);
      expect(new Address('foo', 42, NaN).baseAddress).toBe(42);
      expect(new Address('foo', 42, NaN).name).toBe('foo');

      expect(new Address('foo', 42, Infinity)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, Infinity).address).toBe(42 + 0);
      expect(new Address('foo', 42, Infinity).addressOffset).toBeInstanceOf(
        Offset,
      );
      expect(new Address('foo', 42, Infinity).addressOffset.anonymous).toBe(
        true,
      );
      expect(new Address('foo', 42, Infinity).addressOffset.name).toBe(
        '+ 0000ʰ',
      );
      expect(new Address('foo', 42, Infinity).addressOffset.offset).toBe(0);
      expect(new Address('foo', 42, Infinity).anonymous).toBe(false);
      expect(new Address('foo', 42, Infinity).baseAddress).toBe(42);
      expect(new Address('foo', 42, Infinity).name).toBe('foo');

      expect(new Address('foo', 42, -Infinity)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, -Infinity).address).toBe(42 + 0);
      expect(new Address('foo', 42, -Infinity).addressOffset).toBeInstanceOf(
        Offset,
      );
      expect(new Address('foo', 42, -Infinity).addressOffset.anonymous).toBe(
        true,
      );
      expect(new Address('foo', 42, -Infinity).addressOffset.name).toBe(
        '+ 0000ʰ',
      );
      expect(new Address('foo', 42, -Infinity).addressOffset.offset).toBe(0);
      expect(new Address('foo', 42, -Infinity).anonymous).toBe(false);
      expect(new Address('foo', 42, -Infinity).baseAddress).toBe(42);
      expect(new Address('foo', 42, -Infinity).name).toBe('foo');
    });

    test('(string, number, Offset(name)))', () => {
      const offset = new Offset('bar', 43);

      expect(new Address('foo', 42, offset)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, offset).address).toBe(42 + 43);
      expect(new Address('foo', 42, offset).addressOffset).toBeInstanceOf(
        Offset,
      );
      expect(new Address('foo', 42, offset).addressOffset).not.toBe(offset);
      expect(new Address('foo', 42, offset).addressOffset.anonymous).toBe(
        false,
      );
      expect(new Address('foo', 42, offset).addressOffset.name).toBe('bar');
      expect(new Address('foo', 42, offset).addressOffset.offset).toBe(43);
      expect(new Address('foo', 42, offset).anonymous).toBe(false);
      expect(new Address('foo', 42, offset).baseAddress).toBe(42);
      expect(new Address('foo', 42, offset).name).toBe('foo');
    });

    test('(string, number, Offset(undefined)))', () => {
      const offset = new Offset(undefined, 43);

      expect(new Address('foo', 42, offset)).toBeInstanceOf(Address);
      expect(new Address('foo', 42, offset).address).toBe(42 + 43);
      expect(new Address('foo', 42, offset).addressOffset).toBeInstanceOf(
        Offset,
      );
      expect(new Address('foo', 42, offset).addressOffset).not.toBe(offset);
      expect(new Address('foo', 42, offset).addressOffset.anonymous).toBe(true);
      expect(new Address('foo', 42, offset).addressOffset.name).toBe('+ 002Bʰ');
      expect(new Address('foo', 42, offset).addressOffset.offset).toBe(43);
      expect(new Address('foo', 42, offset).anonymous).toBe(false);
      expect(new Address('foo', 42, offset).baseAddress).toBe(42);
      expect(new Address('foo', 42, offset).name).toBe('foo');
    });
  });

  describe('with offseted address', () => {
    test('(string, Address(undefined, number, number))', () => {
      const bar = new Address(undefined, 43, 44);

      expect(new Address('foo', bar)).toBeInstanceOf(Address);
      expect(new Address('foo', bar).address).toBe(43 + 44);
      expect(new Address('foo', bar).addressOffset).toBeInstanceOf(Offset);
      expect(new Address('foo', bar).addressOffset.anonymous).toBe(true);
      expect(new Address('foo', bar).addressOffset.name).toBe('+ 0000ʰ');
      expect(new Address('foo', bar).addressOffset.offset).toBe(0);
      expect(new Address('foo', bar).anonymous).toBe(false);
      expect(new Address('foo', bar).baseAddress).toBe(43 + 44);
      expect(new Address('foo', bar).name).toBe('foo');
    });
  });
});

describe('format', () => {
  test('anonymous', () => {
    expect(new Address(undefined, 42).format()).toBe(
      '002Aʰ ; <anonymous 002Aʰ>',
    );
  });

  test('anonymous with anonymous offset', () => {
    expect(new Address(undefined, 42, 43).format()).toBe(
      '0055ʰ ; <anonymous 002Aʰ> + 002Bʰ (002Aʰ + 002Bʰ)',
    );
    expect(new Address(undefined, 42, -43).format()).toBe(
      'FFFFʰ ; <anonymous 002Aʰ> - 002Bʰ (002Aʰ - 002Bʰ)',
    );
  });

  test('anonymous with named offset', () => {
    expect(new Address(undefined, 42, new Offset('bar', 43)).format()).toBe(
      '0055ʰ ; <anonymous 002Aʰ> + bar (002Aʰ + 002Bʰ)',
    );
    expect(new Address(undefined, 42, new Offset('bar', -43)).format()).toBe(
      'FFFFʰ ; <anonymous 002Aʰ> + bar (002Aʰ - 002Bʰ)',
    );
  });

  test('named', () => {
    expect(new Address('foo', 42).format()).toBe('002Aʰ ; foo');
  });

  test('named with anonymous offset', () => {
    expect(new Address('foo', 42, 43).format()).toBe(
      '0055ʰ ; foo + 002Bʰ (002Aʰ + 002Bʰ)',
    );
    expect(new Address('foo', 42, -43).format()).toBe(
      'FFFFʰ ; foo - 002Bʰ (002Aʰ - 002Bʰ)',
    );
  });

  test('named with named offset', () => {
    expect(new Address('foo', 42, new Offset('bar', 43)).format()).toBe(
      '0055ʰ ; foo + bar (002Aʰ + 002Bʰ)',
    );
    expect(new Address('foo', 42, new Offset('bar', -43)).format()).toBe(
      'FFFFʰ ; foo + bar (002Aʰ - 002Bʰ)',
    );
  });
});

describe('offset', () => {
  test('offset(number)', () => {
    const foo = new Address('foo', 42);
    const bar = foo.offset(-43);

    expect(bar).not.toBe(foo);
    expect(bar.address).toBe(0xffff);
    expect(bar.addressOffset).toBeInstanceOf(Offset);
    expect(bar.addressOffset.anonymous).toBe(true);
    expect(bar.addressOffset.name).toBe('- 002Bʰ');
    expect(bar.addressOffset.offset).toBe(-43);
    expect(bar.anonymous).toBe(false);
    expect(bar.baseAddress).toBe(42);
    expect(bar.name).toBe('foo');

    expect(bar.format()).toBe('FFFFʰ ; foo - 002Bʰ (002Aʰ - 002Bʰ)');
  });

  test('offset(0)', () => {
    const foo = new Address('foo', 42);
    const bar = foo.offset(0);

    expect(bar).not.toBe(foo);
  });

  test('offset(Offset(string))', () => {
    const foo = new Address('foo', 42);
    const bar = foo.offset(new Offset('bar', -43));

    expect(bar).not.toBe(foo);
    expect(bar.address).toBe(0xffff);
    expect(bar.addressOffset).toBeInstanceOf(Offset);
    expect(bar.addressOffset.anonymous).toBe(false);
    expect(bar.addressOffset.name).toBe('bar');
    expect(bar.addressOffset.offset).toBe(-43);
    expect(bar.anonymous).toBe(false);
    expect(bar.baseAddress).toBe(42);
    expect(bar.name).toBe('foo');

    expect(bar.format()).toBe('FFFFʰ ; foo + bar (002Aʰ - 002Bʰ)');
  });

  test('offset(Offset(string, 0))', () => {
    const foo = new Address('foo', 42);
    const bar = foo.offset(new Offset('bar', 0));

    expect(bar).not.toBe(foo);
    expect(bar.format()).toBe('002Aʰ ; foo + bar (002Aʰ + 0000ʰ)');
  });
});

test('of', () => {
  expect(
    Address.of({
      name: 'foo',
      address: 0x2b,
      baseAddress: 0x2a,
      addressOffset: {
        anonymous: false,
        name: 'bar',
        offset: 1,
      },
      anonymous: false,
    }),
  ).toEqual(new Address('foo', 0x2a, new Offset('bar', 1)));

  expect(
    Address.of({
      name: 'foo',
      address: 0x2b,
      baseAddress: 0x2a,
      addressOffset: {
        anonymous: true,
        name: 'bar',
        offset: 1,
      },
      anonymous: true,
    }),
  ).toEqual(new Address(undefined, 0x2a, new Offset(undefined, 1)));
});

test('createDict', () => {
  expect(Address.createDict({ FOO: 0, BAR: 2, BAZ: 4 })).toEqual(
    utils.createAddressMap({ FOO: 0, BAR: 2, BAZ: 4 }),
  );
});

test('createWork', () => {
  expect(Address.createWork(42, { FOO: 1, BAR: 2, BAZ: 2 })).toEqual(
    utils.createAddressWorkMap(42, { FOO: 1, BAR: 2, BAZ: 2 }),
  );
});
