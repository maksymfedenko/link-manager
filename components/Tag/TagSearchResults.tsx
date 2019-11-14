import { createStyles, Box, Chip, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useFetchTags from 'src/hooks/useFetchTags';
import Progress from 'components/Progress/Progress';
import { useCallback } from 'react';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
  }),
);

const TagSearchResults: React.FC<Props> = ({ search }) => {
  const classes = useStyles();
  const [{ loading, data: tagListResponse }] = useFetchTags({ search });

  const renderTags = useCallback(
    () =>
      tagListResponse!.tags.map((tag) => (
        <Chip
          className={classes.chip}
          size="small"
          key={tag.title}
          label={tag.title}
          color="primary"
        />
      )),
    [tagListResponse],
  );
  const isTagsFound = tagListResponse && !isEmpty(tagListResponse.tags);

  return (
    <Box className={classes.wrapper}>
      <Progress open={loading} />
      {isTagsFound && renderTags()}
      {!loading && !isTagsFound && (
        <Typography variant="h6">Tags not found.</Typography>
      )}
    </Box>
  );
};

type Props = {
  search: string;
};

export default TagSearchResults;
