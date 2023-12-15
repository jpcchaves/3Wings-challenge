export type ApiPaginatedResponse<T> = {
  content: Array<T>;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
