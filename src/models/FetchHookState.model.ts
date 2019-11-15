import { ApolloError } from 'apollo-client';

export interface FetchHookState<T> {
  loading: boolean;
  error: ApolloError | undefined;
  data: T;
  isAccessDenied?: boolean;
}
