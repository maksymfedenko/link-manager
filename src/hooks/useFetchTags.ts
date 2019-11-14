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

const useFetchTags = (props?: Props): [FetchHookState<TagListResponse>] => {
  const { user } = useContext(AuthContext);
  const [fetchTags, { loading, error, data }] = useLazyQuery<TagListResponse>(
    TAGS_QUERY,
  );

  useEffect(() => {
    if (user) {
      const where: TagsWhere = {
        userId: user.sub,
      };

      if (props && props.search) {
        where.title_contains = props.search; // eslint-disable-line @typescript-eslint/camelcase
      }

      fetchTags({
        variables: {
          where,
        },
      });
    }
  }, [user]);

  return [{ loading, error, data }];
};

type Props = {
  search?: string;
};

type TagsWhere = {
  userId: string;
  title_contains?: string;
};

export default useFetchTags;
