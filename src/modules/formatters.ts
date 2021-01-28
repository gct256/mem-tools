/** Options for formatter */
type FormatterOptions = {
  /** Prefix. */
  prefix: string;
  /** Postfix. */
  postfix: string;
  /** If set true, use toUpperCase. If set false, use toLowerCase. */
  upperCase: boolean;
  /** Padding character. */
  padding: string;
};

const hexOptions: FormatterOptions = {
  prefix: '',
  postfix: 'ʰ',
  upperCase: true,
  padding: '0',
};

const decOptions: FormatterOptions = {
  prefix: '',
  postfix: '',
  upperCase: false,
  padding: ' ',
};

const changeCase = (value: string, upperCase: boolean): string =>
  upperCase ? value.toUpperCase() : value.toLowerCase();

const format = (
  base: number,
  value: number,
  byteSize: number,
  options: FormatterOptions,
): string => {
  const max = 2 ** (byteSize * 8) - 1;
  const size = max.toString(base).length;

  return `${options.prefix}${changeCase(
    (value & max).toString(base),
    options.upperCase,
  )
    .padStart(size, options.padding)
    .slice(-size)}${options.postfix}`;
};

/** Number formatters for 8bit/16bit decimal/dexadecimal. */
export const formatters = {
  /**
   * Format number as 8bit decimal.
   *
   * @param value
   * @param options
   */
  dec8(value: number, options: Partial<FormatterOptions> = {}): string {
    return format(10, value, 1, { ...decOptions, ...options });
  },

  /**
   * Format number as 16bit decimal.
   *
   * @param value
   * @param options
   */
  dec16(value: number, options: Partial<FormatterOptions> = {}): string {
    return format(10, value, 2, { ...decOptions, ...options });
  },

  /**
   * Format number as 8bit hexadecimal.
   *
   * @param value
   * @param options
   */
  hex8(value: number, options: Partial<FormatterOptions> = {}): string {
    return format(16, value, 1, { ...hexOptions, ...options });
  },

  /**
   * Format number as 16bit hexadecimal.
   *
   * @param value
   * @param options
   */
  hex16(value: number, options: Partial<FormatterOptions> = {}): string {
    return format(16, value, 2, { ...hexOptions, ...options });
  },
};
