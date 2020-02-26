import { Offset } from '../src';

describe('constructor', () => {
  test('(string, number)', () => {
    expect(new Offset('foo', 42)).toBeInstanceOf(Offset);
    expect(new Offset('foo', 42).anonymous).toBe(false);
    expect(new Offset('foo', 42).name).toBe('foo');
    expect(new Offset('foo', 42).offset).toBe(42);
  });

  test('(string, not number)', () => {
    expect(new Offset('foo', NaN)).toBeInstanceOf(Offset);
    expect(new Offset('foo', NaN).anonymous).toBe(false);
    expect(new Offset('foo', NaN).name).toBe('foo');
    expect(new Offset('foo', NaN).offset).toBe(0);

    expect(new Offset('foo', Infinity)).toBeInstanceOf(Offset);
    expect(new Offset('foo', Infinity).anonymous).toBe(false);
    expect(new Offset('foo', Infinity).name).toBe('foo');
    expect(new Offset('foo', Infinity).offset).toBe(0);

    expect(new Offset('foo', -Infinity)).toBeInstanceOf(Offset);
    expect(new Offset('foo', -Infinity).anonymous).toBe(false);
    expect(new Offset('foo', -Infinity).name).toBe('foo');
    expect(new Offset('foo', -Infinity).offset).toBe(0);
  });

  test('(undefined, number)', () => {
    expect(new Offset(undefined, 42)).toBeInstanceOf(Offset);
    expect(new Offset(undefined, 42).anonymous).toBe(true);
    expect(new Offset(undefined, 42).name).toBe('+ 002Aʰ');
    expect(new Offset(undefined, 42).offset).toBe(42);
  });
});

describe('format', () => {
  test('named, positive', () => {
    expect(new Offset('foo', 42).format()).toBe('+ foo<+002Aʰ>');
  });
  test('named, zero', () => {
    expect(new Offset('foo', 0).format()).toBe('+ foo<+0000ʰ>');
  });
  test('named, negative', () => {
    expect(new Offset('foo', -42).format()).toBe('+ foo<-002Aʰ>');
  });

  test('anonymous, positive', () => {
    expect(new Offset(undefined, 42).format()).toBe('+ 002Aʰ');
  });
  test('anonymous, zero', () => {
    expect(new Offset(undefined, 0).format()).toBe('+ 0000ʰ');
  });
  test('anonymous, negative', () => {
    expect(new Offset(undefined, -42).format()).toBe('- 002Aʰ');
  });
});

describe('formatName', () => {
  test('named, positive', () => {
    expect(new Offset('foo', 42).formatName()).toBe('+ foo');
  });
  test('named, zero', () => {
    expect(new Offset('foo', 0).formatName()).toBe('+ foo');
  });
  test('named, negative', () => {
    expect(new Offset('foo', -42).formatName()).toBe('+ foo');
  });

  test('anonymous, positive', () => {
    expect(new Offset(undefined, 42).formatName()).toBe('+ 002Aʰ');
  });
  test('anonymous, zero', () => {
    expect(new Offset(undefined, 0).formatName()).toBe('+ 0000ʰ');
  });
  test('anonymous, negative', () => {
    expect(new Offset(undefined, -42).formatName()).toBe('- 002Aʰ');
  });
});

describe('formatOffset', () => {
  test('named, positive', () => {
    expect(new Offset('foo', 42).formatOffset()).toBe('+ 002Aʰ');
  });
  test('named, zero', () => {
    expect(new Offset('foo', 0).formatOffset()).toBe('+ 0000ʰ');
  });
  test('named, negative', () => {
    expect(new Offset('foo', -42).formatOffset()).toBe('- 002Aʰ');
  });

  test('anonymous, positive', () => {
    expect(new Offset(undefined, 42).formatOffset()).toBe('+ 002Aʰ');
  });
  test('anonymous, zero', () => {
    expect(new Offset(undefined, 0).formatOffset()).toBe('+ 0000ʰ');
  });
  test('anonymous, negative', () => {
    expect(new Offset(undefined, -42).formatOffset()).toBe('- 002Aʰ');
  });
});

test('of', () => {
  expect(Offset.of({ anonymous: true, name: 'foo', offset: 42 })).toEqual(
    new Offset(undefined, 42),
  );

  expect(Offset.of({ anonymous: false, name: 'foo', offset: 42 })).toEqual(
    new Offset('foo', 42),
  );
});

test('createDict', () => {
  expect(() => Offset.createDict({ FOO: 0, BAR: 2, BAZ: 4 })).toThrow();
});

test('createWork', () => {
  expect(() => Offset.createWork({ FOO: 1, BAR: 2, BAZ: 2 })).toThrow();
});
