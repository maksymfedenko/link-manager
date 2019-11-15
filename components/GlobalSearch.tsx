import { useState, useCallback, useEffect } from 'react';
import {
  Drawer,
  createStyles,
  Theme,
  Box,
  Grid,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ClearIcon from '@material-ui/icons/Clear';
import { withApollo } from 'src/hocs/withApollo';
import { SelectOption } from 'src/models/SelectOption.model';
import BookmarkInfiniteScroll from './Bookmark/BookmarkInfiniteScroll';
import TagSearchResults from './Tag/TagSearchResults';

enum SearchBy {
  bookmark = 'bookmark',
  tag = 'tag',
}

const searchByOptions: SelectOption<SearchBy>[] = [
  {
    label: 'Bookmarks',
    value: SearchBy.bookmark,
  },
  {
    label: 'Tags',
    value: SearchBy.tag,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerRoot: {
      zIndex: `${theme.zIndex.appBar - 1} !important` as any,
    },
    drawerPaper: {
      top: 64,
      bottom: 0,
    },
  }),
);

const GlobalSearch: React.FC<Props> = ({ search }) => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchBy, setSearchBy] = useState<SearchBy>(SearchBy.bookmark);

  useEffect(() => {
    setIsOpened(Boolean(search));
  }, [search]);

  const close = useCallback(() => {
    setIsOpened(false);
  }, [setIsOpened]);

  return (
    <Drawer
      anchor="top"
      open={isOpened}
      onClose={close}
      ModalProps={{
        disableEnforceFocus: true,
        disableAutoFocus: true,
      }}
      classes={{
        root: classes.drawerRoot,
        paper: classes.drawerPaper,
      }}
    >
      <Box m={3}>
        <Typography variant="h6">Search Results</Typography>
        <Grid container justify="space-between">
          <Grid item>
            <RadioGroup
              name="type"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as SearchBy)}
            >
              {searchByOptions.map((searchByOption) => (
                <FormControlLabel
                  key={searchByOption.value}
                  value={searchByOption.value}
                  control={<Radio />}
                  label={searchByOption.label}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item>
            <IconButton onClick={close}>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
        {search && (
          <Box mb={3}>
            {searchBy === SearchBy.bookmark && (
              <BookmarkInfiniteScroll search={search} mini />
            )}
            {searchBy === SearchBy.tag && (
              <TagSearchResults search={search} onTagClick={close} />
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

type Props = {
  search: string;
};

export default withApollo(GlobalSearch);
