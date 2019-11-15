import { createStyles, Box, Chip, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useFetchTags from 'src/hooks/useFetchTags';
import Progress from 'components/Progress/Progress';
import { useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import LinkNext from 'next/link';

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

const TagSearchResults: React.FC<Props> = ({ search, onTagClick }) => {
  const classes = useStyles();
  const tagsOptions = useMemo(() => ({ search }), [search]);
  const [{ loading, data: tagListResponse }] = useFetchTags(tagsOptions);

  const renderTags = useCallback(
    () =>
      tagListResponse!.tags.map((tag) => (
        <LinkNext key={tag.title} href="/tags/[id]" as={`/tags/${tag.id}`}>
          <Chip
            className={classes.chip}
            onClick={onTagClick}
            size="small"
            label={tag.title}
            color="primary"
          />
        </LinkNext>
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
  onTagClick?: () => void;
};

export default TagSearchResults;
