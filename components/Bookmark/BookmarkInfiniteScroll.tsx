import { useState, useMemo } from 'react';
import { Box, makeStyles, createStyles, Grid } from '@material-ui/core';
import Progress from 'components/Progress/Progress';
import BookmarkCard from 'components/Bookmark/BookmarkCard';
import useFetchBookmarks from 'src/hooks/useFetchBookmarks';
import Toastr from 'components/Toastr';
import { isEmpty } from 'lodash';
import cn from 'classnames';
import { Waypoint } from 'react-waypoint';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
  }),
);

const BookmarkInfiniteScroll: React.FC<Props> = ({ className, order, tag }) => {
  const classes = useStyles();
  const fetchOptions = useMemo(() => ({ order, tag }), [order, tag]);
  const [
    { loading, error, data: bookmarkListResponse, isAllLoaded },
    { fetchNextPage },
  ] = useFetchBookmarks(fetchOptions);
  const [, setOpenedBookmark] = useState<string>();

  return (
    <Box className={cn(classes.wrapper, className)}>
      <Progress open={loading} />
      <Toastr open={Boolean(error)} error={error} />
      <Grid container spacing={3}>
        {!isEmpty(bookmarkListResponse) &&
          bookmarkListResponse!.bookmarks.map((bookmark) => (
            <Grid item xs={12} sm={4} key={bookmark.id}>
              <BookmarkCard
                bookmark={bookmark}
                onCardClick={setOpenedBookmark}
              />
            </Grid>
          ))}
      </Grid>
      {!isAllLoaded && !loading && <Waypoint onEnter={fetchNextPage} />}
    </Box>
  );
};

type Props = {
  tag?: string | null | undefined;
  order?: string;
  className?: string;
};

export default BookmarkInfiniteScroll;
