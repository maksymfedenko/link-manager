import React, { useState, useCallback, useMemo } from 'react';
import { withApollo } from 'src/hocs/withApollo';
import {
  Container,
  createStyles,
  Theme,
  Box,
  Grid,
  Button,
  Breadcrumbs,
  Link,
  Paper,
} from '@material-ui/core';
import LinkNext from 'next/link';
import { makeStyles } from '@material-ui/styles';
import OnlyAuthGuard from 'components/OnlyAuthGuard';
import NewBookmarkDialog from 'components/Bookmark/NewBookmarkDialog';
import BookmarkInfiniteScroll from 'components/Bookmark/BookmarkInfiniteScroll';
import BookmarkOrderSelect, {
  orderOptions,
} from 'components/Bookmark/BookmarkOrderSelect';
import useFetchTag from 'src/hooks/useFetchTag';
import { get } from 'lodash';
import AccessGuard from 'components/AccessGuard';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      flexGrow: 1,
    },
    settingsWrapper: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
      },
    },
    addBtn: {
      marginLeft: theme.spacing(3),
    },
  }),
);

export const TagPage = () => {
  const router = useRouter();
  const tagId = router.query.id as string;
  const classes = useStyles();
  const [newBookmarkDialogOpened, setNewBookmarkDialogOpened] = useState<
    boolean
  >(false);
  const [isBookmarksOutdated, setIsBookmarksOutdated] = useState<boolean>(
    false,
  );
  const [orderBy, setOrder] = useState<string>(orderOptions[0].value);
  const [{ isAccessDenied, data: tagResponse }] = useFetchTag(tagId);

  const openNewBookmarkDialog = useCallback(() => {
    setNewBookmarkDialogOpened(true);
  }, [setNewBookmarkDialogOpened]);

  const closeNewBookmarkDialog = useCallback(() => {
    setNewBookmarkDialogOpened(false);
  }, [setNewBookmarkDialogOpened]);

  const handleCreateBookmark = useCallback(() => {
    setIsBookmarksOutdated(true);
    closeNewBookmarkDialog();
  }, [setIsBookmarksOutdated]);

  const handleBookmarksUpdated = useCallback(() => {
    setIsBookmarksOutdated(false);
  }, [setIsBookmarksOutdated]);

  const newBookmarkIDefaultValues = useMemo(() => {
    if (!tagResponse || !tagResponse.tag) return;
    return { tags: [tagResponse.tag] };
  }, [tagResponse]);

  return (
    <OnlyAuthGuard>
      <AccessGuard
        isAccessDenied={isAccessDenied}
        message="You have no access to that tag."
      >
        <Container maxWidth={false} className={classes.root}>
          <Box mb={3}>
            <Grid container justify="space-between">
              <Paper elevation={0}>
                <Breadcrumbs aria-label="breadcrumb">
                  <LinkNext href="/">
                    <Link color="inherit">Index</Link>
                  </LinkNext>
                  <LinkNext href="/tags/[id]" as={`/tags/${tagId}`}>
                    <Link color="textPrimary">
                      {get(tagResponse, 'tag.title', '-')}
                    </Link>
                  </LinkNext>
                </Breadcrumbs>
              </Paper>
              <Grid item className={classes.settingsWrapper}>
                <BookmarkOrderSelect
                  currentOrder={orderBy}
                  changeOrder={setOrder}
                />
                <Button
                  className={classes.addBtn}
                  variant="contained"
                  color="primary"
                  onClick={openNewBookmarkDialog}
                >
                  Add New
                </Button>
              </Grid>
            </Grid>
          </Box>

          <BookmarkInfiniteScroll
            order={orderBy}
            tag={tagId}
            isBookmarksOutdated={isBookmarksOutdated}
            onBookmarksRefetch={handleBookmarksUpdated}
          />
          <NewBookmarkDialog
            defaultValues={newBookmarkIDefaultValues}
            open={newBookmarkDialogOpened}
            onClose={closeNewBookmarkDialog}
            onSubmit={handleCreateBookmark}
          />
        </Container>
      </AccessGuard>
    </OnlyAuthGuard>
  );
};

export default withApollo(TagPage);
