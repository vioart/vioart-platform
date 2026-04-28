type UseTableParams<T> = {
  data: T[];
  search: string;
  sortFn?: (a: T, b: T) => number;
  filterFn?: (item: T, keyword: string) => boolean;
};

export function useTable<T>({
  data,
  search,
  sortFn,
  filterFn,
}: UseTableParams<T>) {
  const keyword = search.toLowerCase();

  const filtered = filterFn
    ? data.filter((item) => filterFn(item, keyword))
    : data;

  const sorted = sortFn ? [...filtered].sort(sortFn) : filtered;

  return {
    data: sorted,
    total: sorted.length,
  };
}
