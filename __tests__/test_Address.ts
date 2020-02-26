import { Address, Offset } from '../src';

describe('constructor', () => {
  test('(string, number)', () => {
    const foo = new Address('foo', 42);

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(42);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(false);
    expect(foo.baseAddress).toBe(42);
    expect(foo.name).toBe('foo');
  });

  test('(string, not number)', () => {
    const foo = new Address('foo', NaN);

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(0);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(false);
    expect(foo.baseAddress).toBe(0);
    expect(foo.name).toBe('foo');

    const bar = new Address('foo', Infinity);

    expect(bar).toBeInstanceOf(Address);
    expect(bar.address).toBe(0);
    expect(bar.addressOffset).toBeInstanceOf(Offset);
    expect(bar.addressOffset.anonymous).toBe(true);
    expect(bar.addressOffset.name).toBe('+ 0000ʰ');
    expect(bar.addressOffset.offset).toBe(0);
    expect(bar.anonymous).toBe(false);
    expect(bar.baseAddress).toBe(0);
    expect(bar.name).toBe('foo');

    const baz = new Address('foo', -Infinity);

    expect(baz).toBeInstanceOf(Address);
    expect(baz.address).toBe(0);
    expect(baz.addressOffset).toBeInstanceOf(Offset);
    expect(baz.addressOffset.anonymous).toBe(true);
    expect(baz.addressOffset.name).toBe('+ 0000ʰ');
    expect(baz.addressOffset.offset).toBe(0);
    expect(baz.anonymous).toBe(false);
    expect(baz.baseAddress).toBe(0);
    expect(baz.name).toBe('foo');
  });

  test('(undefined, number)', () => {
    const foo = new Address(undefined, 42);

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(42);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(true);
    expect(foo.baseAddress).toBe(42);
    expect(foo.name).toBe('<anonymous 002Aʰ>');
  });

  test('(undefined, not number)', () => {
    const foo = new Address(undefined, NaN);

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(0);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(true);
    expect(foo.baseAddress).toBe(0);
    expect(foo.name).toBe('<anonymous 0000ʰ>');

    const bar = new Address(undefined, Infinity);

    expect(bar).toBeInstanceOf(Address);
    expect(bar.address).toBe(0);
    expect(bar.addressOffset).toBeInstanceOf(Offset);
    expect(bar.addressOffset.anonymous).toBe(true);
    expect(bar.addressOffset.name).toBe('+ 0000ʰ');
    expect(bar.addressOffset.offset).toBe(0);
    expect(bar.anonymous).toBe(true);
    expect(bar.baseAddress).toBe(0);
    expect(bar.name).toBe('<anonymous 0000ʰ>');

    const baz = new Address(undefined, -Infinity);

    expect(baz).toBeInstanceOf(Address);
    expect(baz.address).toBe(0);
    expect(baz.addressOffset).toBeInstanceOf(Offset);
    expect(baz.addressOffset.anonymous).toBe(true);
    expect(baz.addressOffset.name).toBe('+ 0000ʰ');
    expect(baz.addressOffset.offset).toBe(0);
    expect(baz.anonymous).toBe(true);
    expect(baz.baseAddress).toBe(0);
    expect(baz.name).toBe('<anonymous 0000ʰ>');
  });

  test('(string, Address(name))', () => {
    const foo = new Address('foo', new Address('bar', 43));

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(43);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(false);
    expect(foo.baseAddress).toBe(43);
    expect(foo.name).toBe('foo');
  });

  test('(string, Address(undefined))', () => {
    const foo = new Address('foo', new Address(undefined, 43));

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(43);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(false);
    expect(foo.baseAddress).toBe(43);
    expect(foo.name).toBe('foo');
  });

  test('(undefined, Address(name))', () => {
    const foo = new Address(undefined, new Address('bar', 43));

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(43);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(true);
    expect(foo.baseAddress).toBe(43);
    expect(foo.name).toBe('<anonymous 002Bʰ>');
  });

  test('(undefined, Address(undefined))', () => {
    const foo = new Address(undefined, new Address(undefined, 43));

    expect(foo).toBeInstanceOf(Address);
    expect(foo.address).toBe(43);
    expect(foo.addressOffset).toBeInstanceOf(Offset);
    expect(foo.addressOffset.anonymous).toBe(true);
    expect(foo.addressOffset.name).toBe('+ 0000ʰ');
    expect(foo.addressOffset.offset).toBe(0);
    expect(foo.anonymous).toBe(true);
    expect(foo.baseAddress).toBe(43);
    expect(foo.name).toBe('<anonymous 002Bʰ>');
  });

  describe('with offset', () => {
    test('(string, number, number)', () => {
      const foo = new Address('foo', 42, 43);

      expect(foo).toBeInstanceOf(Address);
      expect(foo.address).toBe(42 + 43);
      expect(foo.addressOffset).toBeInstanceOf(Offset);
      expect(foo.addressOffset.anonymous).toBe(true);
      expect(foo.addressOffset.name).toBe('+ 002Bʰ');
      expect(foo.addressOffset.offset).toBe(43);
      expect(foo.anonymous).toBe(false);
      expect(foo.baseAddress).toBe(42);
      expect(foo.name).toBe('foo');

      const bar = new Address('foo', 42, -43);

      expect(bar).toBeInstanceOf(Address);
      expect(bar.address).toBe(0xffff);
      expect(bar.addressOffset).toBeInstanceOf(Offset);
      expect(bar.addressOffset.anonymous).toBe(true);
      expect(bar.addressOffset.name).toBe('- 002Bʰ');
      expect(bar.addressOffset.offset).toBe(-43);
      expect(bar.anonymous).toBe(false);
      expect(bar.baseAddress).toBe(42);
      expect(bar.name).toBe('foo');
    });

    test('(string, number, not number)', () => {
      const foo = new Address('foo', 42, NaN);

      expect(foo).toBeInstanceOf(Address);
      expect(foo.address).toBe(42 + 0);
      expect(foo.addressOffset).toBeInstanceOf(Offset);
      expect(foo.addressOffset.anonymous).toBe(true);
      expect(foo.addressOffset.name).toBe('+ 0000ʰ');
      expect(foo.addressOffset.offset).toBe(0);
      expect(foo.anonymous).toBe(false);
      expect(foo.baseAddress).toBe(42);
      expect(foo.name).toBe('foo');

      const bar = new Address('foo', 42, Infinity);

      expect(bar).toBeInstanceOf(Address);
      expect(bar.address).toBe(42 + 0);
      expect(bar.addressOffset).toBeInstanceOf(Offset);
      expect(bar.addressOffset.anonymous).toBe(true);
      expect(bar.addressOffset.name).toBe('+ 0000ʰ');
      expect(bar.addressOffset.offset).toBe(0);
      expect(bar.anonymous).toBe(false);
      expect(bar.baseAddress).toBe(42);
      expect(bar.name).toBe('foo');

      const baz = new Address('foo', 42, -Infinity);

      expect(baz).toBeInstanceOf(Address);
      expect(baz.address).toBe(42 + 0);
      expect(baz.addressOffset).toBeInstanceOf(Offset);
      expect(baz.addressOffset.anonymous).toBe(true);
      expect(baz.addressOffset.name).toBe('+ 0000ʰ');
      expect(baz.addressOffset.offset).toBe(0);
      expect(baz.anonymous).toBe(false);
      expect(baz.baseAddress).toBe(42);
      expect(baz.name).toBe('foo');
    });

    test('(string, number, Offset(name)))', () => {
      const bar = new Offset('bar', 43);
      const foo = new Address('foo', 42, bar);

      expect(foo).toBeInstanceOf(Address);
      expect(foo.address).toBe(42 + 43);
      expect(foo.addressOffset).toBeInstanceOf(Offset);
      expect(foo.addressOffset).not.toBe(bar);
      expect(foo.addressOffset.anonymous).toBe(false);
      expect(foo.addressOffset.name).toBe('bar');
      expect(foo.addressOffset.offset).toBe(43);
      expect(foo.anonymous).toBe(false);
      expect(foo.baseAddress).toBe(42);
      expect(foo.name).toBe('foo');
    });

    test('(string, number, Offset(undefined)))', () => {
      const bar = new Offset(undefined, 43);
      const foo = new Address('foo', 42, bar);

      expect(foo).toBeInstanceOf(Address);
      expect(foo.address).toBe(42 + 43);
      expect(foo.addressOffset).toBeInstanceOf(Offset);
      expect(foo.addressOffset).not.toBe(bar);
      expect(foo.addressOffset.anonymous).toBe(true);
      expect(foo.addressOffset.name).toBe('+ 002Bʰ');
      expect(foo.addressOffset.offset).toBe(43);
      expect(foo.anonymous).toBe(false);
      expect(foo.baseAddress).toBe(42);
      expect(foo.name).toBe('foo');
    });
  });

  describe('with offseted address', () => {
    test('(string, Address(undefined, number, number))', () => {
      const foo = new Address('foo', new Address(undefined, 43, 44));

      expect(foo).toBeInstanceOf(Address);
      expect(foo.address).toBe(43 + 44);
      expect(foo.addressOffset).toBeInstanceOf(Offset);
      expect(foo.addressOffset.anonymous).toBe(true);
      expect(foo.addressOffset.name).toBe('+ 0000ʰ');
      expect(foo.addressOffset.offset).toBe(0);
      expect(foo.anonymous).toBe(false);
      expect(foo.baseAddress).toBe(43 + 44);
      expect(foo.name).toBe('foo');
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
  expect(() => Address.createDict({ FOO: 0, BAR: 2, BAZ: 4 })).toThrow();
});

test('createWork', () => {
  expect(() => Address.createWork(42, { FOO: 1, BAR: 2, BAZ: 2 })).toThrow();
});
