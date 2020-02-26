import { formatters } from '../src';

describe('dec8', () => {
  test('normal', () => {
    expect(formatters.dec8(0)).toBe('  0');
    expect(formatters.dec8(255)).toBe('255');
  });
  test('over 255', () => {
    expect(formatters.dec8(256)).toBe('  0');
  });
  test('under 0', () => {
    expect(formatters.dec8(-1)).toBe('255');
  });
  test('not finite', () => {
    expect(formatters.dec8(NaN)).toBe('  0');
    expect(formatters.dec8(Infinity)).toBe('  0');
    expect(formatters.dec8(-Infinity)).toBe('  0');
  });
  describe('options', () => {
    test('prefix', () => {
      expect(formatters.dec8(1, { prefix: 'x' })).toBe('x  1');
      expect(formatters.dec8(1, { prefix: '' })).toBe('  1');
    });
    test('postfix', () => {
      expect(formatters.dec8(1, { postfix: 'x' })).toBe('  1x');
      expect(formatters.dec8(1, { postfix: '' })).toBe('  1');
    });
    test('upperCase', () => {
      expect(formatters.dec8(1, { prefix: 'x', upperCase: true })).toBe('x  1');
      expect(formatters.dec8(1, { prefix: 'x', upperCase: false })).toBe(
        'x  1',
      );
    });
    test('padding', () => {
      expect(formatters.dec8(1, { padding: 'x' })).toBe('xx1');
      expect(formatters.dec8(1, { padding: '' })).toBe('1');
      expect(formatters.dec8(1, { padding: 'xy' })).toBe('xy1');
      expect(formatters.dec8(1, { padding: 'xyz' })).toBe('xy1');
    });
  });
});

describe('dec16', () => {
  test('normal', () => {
    expect(formatters.dec16(0)).toBe('    0');
    expect(formatters.dec16(65535)).toBe('65535');
  });
  test('over 65535', () => {
    expect(formatters.dec16(65536)).toBe('    0');
  });
  test('under 0', () => {
    expect(formatters.dec16(-1)).toBe('65535');
  });
  test('not finite', () => {
    expect(formatters.dec16(NaN)).toBe('    0');
    expect(formatters.dec16(Infinity)).toBe('    0');
    expect(formatters.dec16(-Infinity)).toBe('    0');
  });
  describe('options', () => {
    test('prefix', () => {
      expect(formatters.dec16(1, { prefix: 'x' })).toBe('x    1');
      expect(formatters.dec16(1, { prefix: '' })).toBe('    1');
    });
    test('postfix', () => {
      expect(formatters.dec16(1, { postfix: 'x' })).toBe('    1x');
      expect(formatters.dec16(1, { postfix: '' })).toBe('    1');
    });
    test('upperCase', () => {
      expect(formatters.dec16(1, { prefix: 'x', upperCase: true })).toBe(
        'x    1',
      );
      expect(formatters.dec16(1, { prefix: 'x', upperCase: false })).toBe(
        'x    1',
      );
    });
    test('padding', () => {
      expect(formatters.dec16(1, { padding: 'x' })).toBe('xxxx1');
      expect(formatters.dec16(1, { padding: '' })).toBe('1');
      expect(formatters.dec16(1, { padding: 'xy' })).toBe('xyxy1');
      expect(formatters.dec16(1, { padding: 'xyz' })).toBe('xyzx1');
      expect(formatters.dec16(1, { padding: 'xyzab' })).toBe('xyza1');
    });
  });
});

describe('hex8', () => {
  test('normal', () => {
    expect(formatters.hex8(0)).toBe('00ʰ');
    expect(formatters.hex8(255)).toBe('FFʰ');
  });
  test('over 255', () => {
    expect(formatters.hex8(256)).toBe('00ʰ');
  });
  test('under 0', () => {
    expect(formatters.hex8(-1)).toBe('FFʰ');
  });
  test('not finite', () => {
    expect(formatters.hex8(NaN)).toBe('00ʰ');
    expect(formatters.hex8(Infinity)).toBe('00ʰ');
    expect(formatters.hex8(-Infinity)).toBe('00ʰ');
  });
  describe('options', () => {
    test('prefix', () => {
      expect(formatters.hex8(1, { prefix: 'x' })).toBe('x01ʰ');
      expect(formatters.hex8(1, { prefix: '' })).toBe('01ʰ');
    });
    test('postfix', () => {
      expect(formatters.hex8(1, { postfix: 'x' })).toBe('01x');
      expect(formatters.hex8(1, { postfix: '' })).toBe('01');
    });
    test('upperCase', () => {
      expect(formatters.hex8(255, { prefix: 'x', upperCase: true })).toBe(
        'xFFʰ',
      );
      expect(formatters.hex8(255, { prefix: 'x', upperCase: false })).toBe(
        'xffʰ',
      );
    });
    test('padding', () => {
      expect(formatters.hex8(1, { padding: 'x' })).toBe('x1ʰ');
      expect(formatters.hex8(1, { padding: '' })).toBe('1ʰ');
      expect(formatters.hex8(1, { padding: 'xy' })).toBe('x1ʰ');
      expect(formatters.hex8(1, { padding: 'xyz' })).toBe('x1ʰ');
    });
  });
});

describe('hex16', () => {
  test('normal', () => {
    expect(formatters.hex16(0)).toBe('0000ʰ');
    expect(formatters.hex16(65535)).toBe('FFFFʰ');
  });
  test('over 255', () => {
    expect(formatters.hex16(65536)).toBe('0000ʰ');
  });
  test('under 0', () => {
    expect(formatters.hex16(-1)).toBe('FFFFʰ');
  });
  test('not finite', () => {
    expect(formatters.hex16(NaN)).toBe('0000ʰ');
    expect(formatters.hex16(Infinity)).toBe('0000ʰ');
    expect(formatters.hex16(-Infinity)).toBe('0000ʰ');
  });
  describe('options', () => {
    test('prefix', () => {
      expect(formatters.hex16(1, { prefix: 'x' })).toBe('x0001ʰ');
      expect(formatters.hex16(1, { prefix: '' })).toBe('0001ʰ');
    });
    test('postfix', () => {
      expect(formatters.hex16(1, { postfix: 'x' })).toBe('0001x');
      expect(formatters.hex16(1, { postfix: '' })).toBe('0001');
    });
    test('upperCase', () => {
      expect(formatters.hex16(65535, { prefix: 'x', upperCase: true })).toBe(
        'xFFFFʰ',
      );
      expect(formatters.hex16(65535, { prefix: 'x', upperCase: false })).toBe(
        'xffffʰ',
      );
    });
    test('padding', () => {
      expect(formatters.hex16(1, { padding: 'x' })).toBe('xxx1ʰ');
      expect(formatters.hex16(1, { padding: '' })).toBe('1ʰ');
      expect(formatters.hex16(1, { padding: 'xy' })).toBe('xyx1ʰ');
      expect(formatters.hex16(1, { padding: 'xyza' })).toBe('xyz1ʰ');
    });
  });
});
