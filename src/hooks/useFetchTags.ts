import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { FetchHookState } from 'src/models/FetchHookState.model';
import { TagListResponse } from 'src/models/TagListResponse.model';

export const TAGS_QUERY = gql`
  query TagsQuery(
    $first: Int
    $after: String
    $orderBy: TagOrderByInput
    $where: TagWhereInput
  ) {
    tags(first: $first, after: $after, orderBy: $orderBy, where: $where) {
      id
      title
    }
  }
`;

const useFetchTags = (): [FetchHookState<TagListResponse>] => {
  const { user } = useContext(AuthContext);
  const [fetchTags, { loading, error, data }] = useLazyQuery<TagListResponse>(
    TAGS_QUERY,
  );

  useEffect(() => {
    if (user) {
      fetchTags({
        variables: {
          where: {
            userId: user.sub,
          },
        },
      });
    }
  }, [user]);

  return [{ loading, error, data }];
};

export default useFetchTags;
