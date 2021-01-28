export const WORK_LABELS = {
  __FIRST__: '__FIRST__',
  __LAST__: '__LAST__',
  __NEXT__: '__NEXT__',
  __SIZE__: '__SIZE__',
} as const;

export type WorkLabel = typeof WORK_LABELS[keyof typeof WORK_LABELS];

export type Work<T> = {
  /** First of work area. */
  [WORK_LABELS.__FIRST__]: T;
  /** Last of work area. */
  [WORK_LABELS.__LAST__]: T;
  /** Next of work area. */
  [WORK_LABELS.__NEXT__]: T;
  /** Size of work area. */
  [WORK_LABELS.__SIZE__]: number;
};

export const createWork = <T>(
  first: (name: string) => T,
  last: (name: string) => T,
  next: (name: string) => T,
  size: number,
): Work<T> => ({
  [WORK_LABELS.__FIRST__]: first(WORK_LABELS.__FIRST__),
  [WORK_LABELS.__LAST__]: last(WORK_LABELS.__LAST__),
  [WORK_LABELS.__NEXT__]: next(WORK_LABELS.__NEXT__),
  [WORK_LABELS.__SIZE__]: size,
});

export const isWorkLabel = (key: string): boolean => {
  switch (key) {
    case WORK_LABELS.__FIRST__: // fall through

    case WORK_LABELS.__LAST__: // fall through

    case WORK_LABELS.__NEXT__: // fall through

    case WORK_LABELS.__SIZE__: // fall through
      return true;

    default:
      return false;
  }
};
