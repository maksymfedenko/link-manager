import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
import addNewBookmarkTags from 'src/utils/addNewBookmarkTagsToStore';
import { BookmarkFormData } from 'src/models/Bookmark/BookmarkFormData.model';
import { get } from 'lodash';
import { Tag } from 'src/models/Tag.model';
import tagsToSelectOptions from 'src/utils/tagToSelectOption';
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

const NewBookmarkDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
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
  const initialValues: BookmarkFormData = useMemo(
    () => ({
      link: get(defaultValues, 'link', ''),
      title: get(defaultValues, 'title', ''),
      tags: tagsToSelectOptions(get(defaultValues, 'tags', [] as Tag[])),
    }),
    [defaultValues],
  );

  return (
    <BookmarkFormDialog
      initialValues={initialValues}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

type Props = {
  defaultValues?: Partial<Bookmark>;
  open: boolean;
  onClose: () => void;
  onSubmit: (bookmark: Bookmark) => void;
};

export default NewBookmarkDialog;
