export type QueryHooks<T> = {
  data: T;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: unknown;
};
