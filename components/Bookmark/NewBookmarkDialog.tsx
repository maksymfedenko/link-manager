import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
import { isEmpty, find } from 'lodash';
import { TAGS_QUERY } from 'src/hooks/useFetchTags';
import { TagListResponse } from 'src/models/TagListResponse.model';
import { Tag } from 'src/models/Tag.model';
import BookmarkFormDialog from './BookmarkFormDialog';

const CREATE_BOOKMARK = gql`
  mutation createBookmark($data: BookmarkCreateInput!) {
    createBookmark(data: $data) {
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

const NewBookmarkDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [createBookmark] = useMutation<any>(CREATE_BOOKMARK, {
    onCompleted: onSubmit,
    update: (store, { data: { createBookmark: newBookmark } }) => {
      const { tags, userId } = newBookmark;
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
    },
  });
  const handleSubmit = useCallback(
    (data: BookmarkEditRequestData) => {
      createBookmark({ variables: { data } });
    },
    [createBookmark],
  );

  return (
    <BookmarkFormDialog
      initialValues={{ link: '', title: '', tags: [] }}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (bookmark: Bookmark) => void;
};

export default NewBookmarkDialog;
