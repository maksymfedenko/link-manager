import { useState } from 'react';
import { Box, makeStyles, createStyles, Grid } from '@material-ui/core';
import { Bookmark } from 'src/models/Bookmark.model';
import Progress from 'components/Progress/Progress';
import BookmarkCard from 'components/Bookmark/BookmarkCard';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
  }),
);

const BookmarkInfiniteScroll: React.FC<Props> = () => {
  const classes = useStyles();
  const [bookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      title: 'lololosld',
      link:
        'https://github.com/maksymfedenko/grarhql-training/blob/master/frontend/components/LinkList.tsx',
      tags: [],
      bookmarkComments: [],
    },
    {
      id: '2',
      title:
        'In Material Design, the physical properties of paper are translated to the screen.',
      link:
        'https://github.com/maksymfedenko/grarhql-training/blob/master/frontend/components/LinkList.tsx',
      tags: [],
      bookmarkComments: [],
    },
    {
      id: '3',
      title:
        'Chips are compact elements that represent an input, attribute, or action.',
      link:
        'https://github.com/maksymfedenko/grarhql-training/blob/master/frontend/components/LinkList.tsx',
      tags: [],
      bookmarkComments: [],
    },
    {
      id: '4',
      title: 'Your project is running on the limited developer plan',
      link:
        'https://github.com/maksymfedenko/grarhql-training/blob/master/frontend/components/LinkList.tsx',
      tags: [],
      bookmarkComments: [],
    },
  ]);
  const [loading] = useState(false);
  const [, setOpenedBookmark] = useState<string>();

  return (
    <Box className={classes.wrapper}>
      <Progress open={loading} />
      <Grid container spacing={3}>
        {bookmarks.map((bookmark) => (
          <Grid item xs={12} sm={4} key={bookmark.id}>
            <BookmarkCard bookmark={bookmark} onCardClick={setOpenedBookmark} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

type Props = {
  tag?: string | null | undefined;
  order?: string;
};

export default BookmarkInfiniteScroll;
