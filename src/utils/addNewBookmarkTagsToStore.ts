import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { TAGS_QUERY } from 'src/hooks/useFetchTags';
import { Tag } from 'src/models/Tag.model';
import { isEmpty, find } from 'lodash';
import { TagListResponse } from 'src/models/TagListResponse.model';
import { DataProxy } from 'apollo-cache';

const addNewBookmarkTags = (store: DataProxy, bookmark: Bookmark) => {
  const { tags, userId } = bookmark;
  if (isEmpty(tags)) return;

  const variables = {
    where: {
      userId,
    },
  };

  const data: TagListResponse | null = store.readQuery({
    query: TAGS_QUERY,
    variables,
  });

  if (!data) return;

  const tagsState = [...data.tags];

  tags.forEach((tag: Tag) => {
    if (!find(tagsState, { id: tag.id })) {
      tagsState.push(tag);
    }
  });

  store.writeQuery({
    query: TAGS_QUERY,
    variables,
    data: {
      ...data,
      tags: tagsState,
    },
  });
};

export default addNewBookmarkTags;
