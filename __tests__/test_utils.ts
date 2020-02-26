import { utils, Address, Offset } from '../src';

test('createAddressMap', () => {
  expect(
    utils.createAddressMap({
      FOO: 42,
      BAR: new Address('bar', 43),
      BAZ: new Address(undefined, 44),
    }),
  ).toEqual({
    FOO: new Address('FOO', 42),
    BAR: new Address('BAR', 43),
    BAZ: new Address('BAZ', 44),
  });
});

test('createAddressWorkMap', () => {
  expect(
    utils.createAddressWorkMap(42, {
      FOO: 2,
      BAR: 2,
      BAZ: 2,
    }),
  ).toEqual({
    __FIRST__: new Address('__FIRST__', 42),
    __LAST__: new Address('__LAST__', 47),
    __NEXT__: new Address('__NEXT__', 48),
    __SIZE__: 6,
    FOO: new Address('FOO', 42),
    BAR: new Address('BAR', 44),
    BAZ: new Address('BAZ', 46),
  });

  expect(
    utils.createAddressWorkMap(new Address('QUX', 42), {
      FOO: 2,
      BAR: 2,
      BAZ: 2,
    }),
  ).toEqual({
    __FIRST__: new Address('__FIRST__', 42),
    __LAST__: new Address('__LAST__', 47),
    __NEXT__: new Address('__NEXT__', 48),
    __SIZE__: 6,
    FOO: new Address('FOO', 42),
    BAR: new Address('BAR', 44),
    BAZ: new Address('BAZ', 46),
  });
});

test('createOffsetMap', () => {
  expect(
    utils.createOffsetMap({
      FOO: 42,
      BAR: 43,
      BAZ: new Offset('qux', 44),
    }),
  ).toEqual({
    FOO: new Offset('FOO', 42),
    BAR: new Offset('BAR', 43),
    BAZ: new Offset('BAZ', 44),
  });
});

test('createOffsetWorkMap', () => {
  expect(
    utils.createOffsetWorkMap({
      FOO: 2,
      BAR: 2,
      BAZ: 2,
    }),
  ).toEqual({
    __FIRST__: new Offset('__FIRST__', 0),
    __LAST__: new Offset('__LAST__', 4),
    __NEXT__: new Offset('__NEXT__', 6),
    __SIZE__: 6,
    FOO: new Offset('FOO', 0),
    BAR: new Offset('BAR', 2),
    BAZ: new Offset('BAZ', 4),
  });
});

test('createAddressMapFromOffsetMap', () => {
  expect(
    utils.createAddressMapFromOffsetMap(new Address('FOO', 42), {
      BAR: new Offset('BAR', 1),
      BAZ: new Offset('baz', 2),
      QUX: new Offset(undefined, 3),
    }),
  ).toEqual({
    BAR: new Address('FOO', 42, new Offset('BAR', 1)),
    BAZ: new Address('FOO', 42, new Offset('BAZ', 2)),
    QUX: new Address('FOO', 42, new Offset('QUX', 3)),
  });

  expect(
    utils.createAddressMapFromOffsetMap(
      new Address('FOO', 42),
      utils.createOffsetWorkMap({
        BAR: 2,
        BAZ: 2,
        QUX: 2,
      }),
    ),
  ).toEqual({
    BAR: new Address('FOO', 42, new Offset('BAR', 0)),
    BAZ: new Address('FOO', 42, new Offset('BAZ', 2)),
    QUX: new Address('FOO', 42, new Offset('QUX', 4)),
  });
});
