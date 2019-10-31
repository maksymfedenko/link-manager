import { useState, useMemo, useCallback } from 'react';
import { Box, makeStyles, createStyles, Grid, Button } from '@material-ui/core';
import Progress from 'components/Progress/Progress';
import BookmarkCard from 'components/Bookmark/BookmarkCard';
import useFetchBookmarks from 'src/hooks/useFetchBookmarks';
import Toastr from 'components/Toastr';
import { isEmpty } from 'lodash';
import cn from 'classnames';
import { Waypoint } from 'react-waypoint';
import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import EditBookmarkDialog from 'components/Bookmark/EditBookmarkDialog';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
  }),
);

const BookmarkInfiniteScroll: React.FC<Props> = ({
  className,
  order,
  tag,
  isBookmarksOutdated,
  onBookmarksRefetch,
}) => {
  const classes = useStyles();
  const [, setViewedBookmark] = useState<Bookmark>();
  const [editedBookmark, setEditedBookmark] = useState<Bookmark>();
  const fetchOptions = useMemo(() => ({ order, tag }), [order, tag]);
  const [
    { loading, error, data: bookmarkListResponse, isAllLoaded, loadingMore },
    { fetchNextPage, reload },
  ] = useFetchBookmarks(fetchOptions);

  const reloadBookmarks = useCallback(() => {
    reload();
    if (onBookmarksRefetch) onBookmarksRefetch();
  }, [reload]);

  return (
    <Box className={cn(classes.wrapper, className)}>
      <Progress open={loading} />
      <Toastr open={Boolean(error)} error={error} />
      <Toastr
        open={isBookmarksOutdated}
        error="Bookmarks is outdated"
        action={
          <Button color="secondary" size="small" onClick={reloadBookmarks}>
            Update
          </Button>
        }
      />
      <Grid container spacing={3}>
        {!isEmpty(bookmarkListResponse) &&
          bookmarkListResponse!.bookmarks.map((bookmark) => (
            <Grid item xs={12} sm={4} key={bookmark.id}>
              <BookmarkCard
                bookmark={bookmark}
                onViewClick={setViewedBookmark}
                onEditClick={setEditedBookmark}
              />
            </Grid>
          ))}
      </Grid>
      {!isAllLoaded && !loading && !loadingMore && (
        <Waypoint onEnter={fetchNextPage} />
      )}
      <EditBookmarkDialog
        open={Boolean(editedBookmark)}
        onClose={() => setEditedBookmark(undefined)}
        onSubmit={() => {}}
        bookmark={editedBookmark}
      />
    </Box>
  );
};

type Props = {
  tag?: string | null | undefined;
  order?: string;
  className?: string;
  isBookmarksOutdated: boolean;
  onBookmarksRefetch?: () => void;
};

export default BookmarkInfiniteScroll;
