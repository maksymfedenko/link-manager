import { useContext, useEffect, useMemo } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { FetchHookState } from 'src/models/FetchHookState.model';
import { TagResponse } from 'src/models/TagResponse.model';

export const TAG_QUERY = gql`
  query TagQuery($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      id
      title
      userId
    }
  }
`;

const useFetchTag = (id: string): [FetchHookState<TagResponse>] => {
  const { user } = useContext(AuthContext);
  const [fetchTag, { loading, error, data }] = useLazyQuery<TagResponse>(
    TAG_QUERY,
  );

  useEffect(() => {
    if (user && id) {
      fetchTag({
        variables: {
          where: { id },
        },
      });
    }
  }, [user, id]);

  const isAccessDenied = useMemo(() => {
    if (!user || !data || !data.tag) return true;
    return data.tag.userId !== user.sub;
  }, [user, data]);

  return [{ loading, error, data, isAccessDenied }];
};

export default useFetchTag;
