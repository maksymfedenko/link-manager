import { useState, useMemo, useCallback } from 'react';
import {
  Box,
  makeStyles,
  createStyles,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import Progress from 'components/Progress/Progress';
import BookmarkCard from 'components/Bookmark/BookmarkCard';
import useFetchBookmarks from 'src/hooks/useFetchBookmarks';
import Toastr from 'components/Toastr';
import { isEmpty } from 'lodash';
import cn from 'classnames';
import { Waypoint } from 'react-waypoint';
import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import EditBookmarkDialog from 'components/Bookmark/EditBookmarkDialog';
import BookmarkMiniCard from './BookmarkMiniCard';

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
  search,
  isBookmarksOutdated,
  onBookmarksRefetch,
  mini,
}) => {
  const classes = useStyles();
  const [, setViewedBookmark] = useState<Bookmark>();
  const [editedBookmark, setEditedBookmark] = useState<Bookmark>();
  const fetchOptions = useMemo(() => ({ order, tag, search }), [
    order,
    tag,
    search,
  ]);
  const [
    { loading, error, data: bookmarkListResponse, isAllLoaded, loadingMore },
    { fetchNextPage, reload },
  ] = useFetchBookmarks(fetchOptions);

  const renderBookmarks = useCallback(
    (bookmarks: Bookmark[]) => {
      if (mini) {
        return (
          <Grid container spacing={3}>
            {bookmarks.map((bookmark) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={bookmark.id}>
                <BookmarkMiniCard bookmark={bookmark} />
              </Grid>
            ))}
          </Grid>
        );
      }

      return (
        <Grid container spacing={3}>
          {bookmarks.map((bookmark) => (
            <Grid item xs={12} sm={4} key={bookmark.id}>
              <BookmarkCard
                bookmark={bookmark}
                onViewClick={setViewedBookmark}
                onEditClick={setEditedBookmark}
              />
            </Grid>
          ))}
        </Grid>
      );
    },
    [mini, bookmarkListResponse, setViewedBookmark, setEditedBookmark],
  );

  const reloadBookmarks = useCallback(() => {
    reload();
    if (onBookmarksRefetch) onBookmarksRefetch();
  }, [reload]);

  const handleBookmarkUpdate = useCallback(() => {
    setEditedBookmark(undefined);
    reloadBookmarks();
  }, [setEditedBookmark, reloadBookmarks]);

  const isBookmarksFound =
    bookmarkListResponse && !isEmpty(bookmarkListResponse.bookmarks);

  return (
    <Box className={cn(classes.wrapper, className)}>
      <Progress open={loading} />
      <Toastr open={Boolean(error)} error={error} />
      <Toastr
        open={!!isBookmarksOutdated}
        error="Bookmarks is outdated"
        action={
          <Button color="secondary" size="small" onClick={reloadBookmarks}>
            Update
          </Button>
        }
      />
      {isBookmarksFound && renderBookmarks(bookmarkListResponse!.bookmarks)}
      {!loading && !isBookmarksFound && search && (
        <Typography variant="h6">Bookmarks not found.</Typography>
      )}
      {!isAllLoaded && !loading && !loadingMore && (
        <Waypoint onEnter={fetchNextPage} />
      )}
      <EditBookmarkDialog
        open={Boolean(editedBookmark)}
        onClose={() => setEditedBookmark(undefined)}
        onSubmit={handleBookmarkUpdate}
        bookmark={editedBookmark}
      />
    </Box>
  );
};

type Props = {
  tag?: string | null | undefined;
  order?: string;
  search?: string;
  className?: string;
  isBookmarksOutdated?: boolean;
  mini?: boolean;
  onBookmarksRefetch?: () => void;
};

export default BookmarkInfiniteScroll;
