import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
import addNewBookmarkTags from 'src/utils/addNewBookmarkTagsToStore';
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
      addNewBookmarkTags(store, newBookmark);
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
