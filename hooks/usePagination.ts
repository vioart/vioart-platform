type UsePaginationProps<T> = {
  data: T[];
  page: number;
  limit: number;
};

export function usePagination<T>({ data, page, limit }: UsePaginationProps<T>) {
  const total = data.length;

  const safeLimit = limit <= 0 ? 1 : limit;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));

  const currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * safeLimit;
  const end = start + safeLimit;

  const paginated = data.slice(start, end);

  return {
    data: paginated,
    total,
    totalPages,
    currentPage,
    start,
    end,
  };
}
