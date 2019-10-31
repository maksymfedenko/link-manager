import React, { useState, useCallback } from 'react';
import { withApollo } from 'src/hocs/withApollo';
import TagTree from 'components/TagTree/TagTree';
import {
  Container,
  createStyles,
  Theme,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Typography,
  Button,
  IconButton,
  Icon,
  Drawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BookmarkInfiniteScroll from 'components/Bookmark/BookmarkInfiniteScroll';
import { get } from 'lodash';
import BookmarkOrderSelect, {
  orderOptions,
} from 'components/Bookmark/BookmarkOrderSelect';
import { TagOption } from 'src/models/TagOption.model';
import NewBookmarkDialog from 'components/Bookmark/NewBookmarkDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: '16px 24px',
      flexGrow: 1,
    },
    tagTreeWrapper: {
      flex: '0 0 300px',
      paddingRight: theme.spacing(3),
      marginRight: theme.spacing(3),
      borderRight: `thin solid ${theme.palette.grey[400]}`,
    },
    tagTreeDrawer: {
      width: '300px',
      padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
      overflowY: 'auto',
    },
    bookmarkTable: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    settingsWrapper: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    addBtn: {
      marginLeft: theme.spacing(3),
    },
    settingsBox: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

export const HomePage = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const [selectedTag, setSelectedTag] = useState<TagOption>();
  const [tagDrawerOpened, setTagDrawerOpened] = useState<boolean>(false);
  const [newBookmarkDialogOpened, setNewBookmarkDialogOpened] = useState<
    boolean
  >(false);
  const [orderBy, setOrder] = useState<string>(orderOptions[0].value);
  const [isBookmarksOutdated, setIsBookmarksOutdated] = useState(false);

  const openTagDrawer = useCallback(() => {
    setTagDrawerOpened(true);
  }, [setTagDrawerOpened]);

  const closeTagDrawer = useCallback(() => {
    setTagDrawerOpened(false);
  }, [setTagDrawerOpened]);

  const openNewBookmarkDialog = useCallback(() => {
    setNewBookmarkDialogOpened(true);
  }, [setNewBookmarkDialogOpened]);

  const closeNewBookmarkDialog = useCallback(() => {
    setNewBookmarkDialogOpened(false);
  }, [setNewBookmarkDialogOpened]);

  const handleCreateBookmark = useCallback(() => {
    setIsBookmarksOutdated(true);
  }, [setIsBookmarksOutdated]);

  const handleBookmarksUpdated = useCallback(() => {
    setIsBookmarksOutdated(false);
  }, [setIsBookmarksOutdated]);

  return (
    <Container maxWidth={false} className={classes.root}>
      {matches && (
        <div className={classes.tagTreeWrapper}>
          <TagTree onTagSelect={setSelectedTag} selectedTag={selectedTag} />
        </div>
      )}

      <Box className={classes.content}>
        <Box mb={3}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Bookmarks</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              classes={{ item: classes.settingsWrapper }}
            >
              <Box className={classes.settingsBox}>
                {!matches && (
                  <IconButton
                    aria-label="filter of bookmarks by tag"
                    aria-haspopup="true"
                    onClick={openTagDrawer}
                    color="primary"
                  >
                    <Icon className="fas fa-filter" />
                  </IconButton>
                )}
                <BookmarkOrderSelect
                  currentOrder={orderBy}
                  changeOrder={setOrder}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.addBtn}
                  onClick={openNewBookmarkDialog}
                >
                  Add New
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <BookmarkInfiniteScroll
          className={classes.bookmarkTable}
          order={orderBy}
          tag={get(selectedTag, 'id')}
          isBookmarksOutdated={isBookmarksOutdated}
          onBookmarksRefetch={handleBookmarksUpdated}
        />
      </Box>
      <Drawer
        open={tagDrawerOpened}
        onClose={closeTagDrawer}
        classes={{ paper: classes.tagTreeDrawer }}
      >
        <TagTree onTagSelect={setSelectedTag} selectedTag={selectedTag} />
      </Drawer>
      <NewBookmarkDialog
        open={newBookmarkDialogOpened}
        onClose={closeNewBookmarkDialog}
        onSubmit={handleCreateBookmark}
      />
    </Container>
  );
};

export default withApollo(HomePage);
