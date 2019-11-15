import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { useCallback, useMemo } from 'react';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
import { get } from 'lodash';
import { Tag } from 'src/models/Tag.model';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import addNewBookmarkTags from 'src/utils/addNewBookmarkTagsToStore';
import tagsToSelectOptions from 'src/utils/tagToSelectOption';
import BookmarkFormDialog from './BookmarkFormDialog';

const PATCH_BOOKMARK = gql`
  mutation updateBookmark(
    $data: BookmarkUpdateInput!
    $where: BookmarkWhereUniqueInput!
  ) {
    updateBookmark(data: $data, where: $where) {
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

const EditBookmarkDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  bookmark,
}) => {
  const [updateBookmark] = useMutation<any>(PATCH_BOOKMARK, {
    onCompleted: onSubmit,
    update: (store, { data: { updateBookmark: updatedBookmark } }) => {
      addNewBookmarkTags(store, updatedBookmark);
    },
  });

  const handleSubmit = useCallback(
    (data: BookmarkEditRequestData) => {
      updateBookmark({ variables: { data, where: { id: bookmark!.id } } });
    },
    [bookmark, updateBookmark],
  );

  const initialValues = useMemo(() => {
    if (!bookmark) {
      return {
        link: '',
        title: '',
        tags: [],
      };
    }

    return {
      link: bookmark.link,
      title: bookmark.title,
      tags: tagsToSelectOptions(get(bookmark, 'tags', [] as Tag[])),
    };
  }, [bookmark]);

  return (
    <BookmarkFormDialog
      isEdit
      initialValues={initialValues}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

type Props = {
  bookmark: Bookmark | undefined;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export default EditBookmarkDialog;
