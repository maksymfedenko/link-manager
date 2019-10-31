import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import { useCallback, useMemo } from 'react';
import { BookmarkEditRequestData } from 'src/models/Bookmark/BookmarkEditRequestData.model';
import { get } from 'lodash';
import { Tag } from 'src/models/Tag.model';
import BookmarkFormDialog from './BookmarkFormDialog';

const EditBookmarkDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  bookmark,
}) => {
  const handleSubmit = useCallback(
    (values: BookmarkEditRequestData) => {
      console.log('EditBookmarkDialog.handleSubmit', values);
    },
    [onSubmit, bookmark],
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
      tags: get(bookmark, 'tags', [] as Tag[]).map((tag) => ({
        label: tag.title,
        value: tag.id,
      })),
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
  onSubmit: (bookmark: Bookmark) => void;
};

export default EditBookmarkDialog;
