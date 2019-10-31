import { useContext, useEffect, useCallback, useState } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { isNull, last, get } from 'lodash';
import { BookmarkListResponse } from 'src/models/Bookmark/BookmarkListResponse.model';
import { FetchListHookState } from 'src/models/FetchListHookState.model';
import { FetchListHookActions } from 'src/models/FetchListHookActions.model';

export const BOOKMARKS_QUERY = gql`
  query BookmarksQuery(
    $first: Int
    $after: String
    $orderBy: BookmarkOrderByInput
    $where: BookmarkWhereInput
  ) {
    bookmarks(first: $first, after: $after, orderBy: $orderBy, where: $where) {
      id
      title
      userId
      link
      tags {
        id
        title
      }
    }
  }
`;

const useFetchBookmarks = (
  props: Props,
): [FetchListHookState<BookmarkListResponse>, FetchListHookActions] => {
  const { user } = useContext(AuthContext);
  const [
    fetchBookmarks,
    { loading, error, data, fetchMore, refetch },
  ] = useLazyQuery<BookmarkListResponse>(BOOKMARKS_QUERY, {
    fetchPolicy: 'network-only',
  });
  const [isAllLoaded, setAllLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNextPage = useCallback(() => {
    if (loading || loadingMore || !data) return;
    setLoadingMore(true);

    fetchMore({
      variables: {
        after: get(last(data.bookmarks), 'id'),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (!fetchMoreResult.bookmarks.length) setAllLoaded(true);
        setLoadingMore(false);

        return {
          ...prev,
          bookmarks: [...prev!.bookmarks, ...fetchMoreResult.bookmarks],
        };
      },
    });
  }, [fetchMore, data]);

  const reload = useCallback(() => {
    refetch({ after: undefined });
  }, [refetch]);

  useEffect(() => {
    if (!user) return;

    const where: any = {
      userId: user.sub,
    };

    if (props.tag) {
      where.tags_some = { id: props.tag }; // eslint-disable-line @typescript-eslint/camelcase
    } else if (isNull(props.tag)) {
      where.tags_every = { id: null }; // eslint-disable-line @typescript-eslint/camelcase
    }

    setAllLoaded(false);
    fetchBookmarks({
      variables: {
        first: 1,
        orderBy: props.order,
        where,
      },
    });
  }, [user, props]);

  return [
    { loading, error, data, isAllLoaded, loadingMore },
    { fetchNextPage, reload },
  ];
};

type Props = {
  tag?: string | null | undefined;
  order?: string;
};

export default useFetchBookmarks;
