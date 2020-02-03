enum WorkLabel {
  __FIRST__ = '__FIRST__',
  __LAST__ = '__LAST__',
  __NEXT__ = '__NEXT__',
  __SIZE__ = '__SIZE__',
}

export type Work<T> = {
  /** First of work area. */
  [WorkLabel.__FIRST__]: T;
  /** Last of work area. */
  [WorkLabel.__LAST__]: T;
  /** Next of work area. */
  [WorkLabel.__NEXT__]: T;
  /** Size of work area. */
  [WorkLabel.__SIZE__]: number;
};

export const createWork = <T>(
  first: (name: string) => T,
  last: (name: string) => T,
  next: (name: string) => T,
  size: number,
): Work<T> => ({
  [WorkLabel.__FIRST__]: first(WorkLabel.__FIRST__),
  [WorkLabel.__LAST__]: last(WorkLabel.__LAST__),
  [WorkLabel.__NEXT__]: next(WorkLabel.__NEXT__),
  [WorkLabel.__SIZE__]: size,
});
