import { FetchHookState } from './FetchHookState.model';

export interface FetchListHookState<T> extends FetchHookState<T> {
  isAllLoaded: boolean;
}
