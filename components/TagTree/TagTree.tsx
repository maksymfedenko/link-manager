import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { isEmpty, get } from 'lodash';
import { Typography, Box, makeStyles, createStyles } from '@material-ui/core';
import TagTreeItem from 'components/TagTree/TagTreeItem';
import useFetchTags from 'src/hooks/useFetchTags';
import Progress from 'components/Progress/Progress';
import Toastr from 'components/Toastr';
import { useMemo } from 'react';
import { TagOption } from 'src/models/TagOption.model';

const EndIcon = () => <div style={{ width: 24 }} />;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
  }),
);

const renderTags = (tags: TagOption[] | undefined, props: Props) => {
  if (isEmpty(tags)) return undefined;

  return tags!.map((tag) => (
    <TagTreeItem
      key={tag.id + tag.title}
      tag={tag}
      selected={tag.id === get(props.selectedTag, 'id')}
      onTagSelect={props.onTagSelect}
    >
      {renderTags(tag.tags, props)}
    </TagTreeItem>
  ));
};

const TagTree: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [{ loading, error, data: tagListResponse }] = useFetchTags();
  const tags = useMemo(() => {
    const defaultTagOptions: TagOption[] = [
      {
        id: undefined,
        title: 'All',
      },
      {
        id: null,
        title: 'Without tags',
      },
    ];

    return isEmpty(tagListResponse)
      ? defaultTagOptions
      : defaultTagOptions.concat(tagListResponse!.tags);
  }, [tagListResponse]);

  return (
    <Box>
      <Box mb={1}>
        <Typography variant="h6">Tags</Typography>
      </Box>
      <Box className={classes.root}>
        <Progress open={loading} size={40} />
        <Toastr open={Boolean(error)} error={error} />
        <TreeView
          defaultCollapseIcon={<ArrowDropDownIcon />}
          defaultExpandIcon={<ArrowRightIcon />}
          defaultEndIcon={<EndIcon />}
        >
          {renderTags(tags, props)}
        </TreeView>
      </Box>
    </Box>
  );
};

type Props = {
  selectedTag?: TagOption;
  onTagSelect: (selectedTag: TagOption) => void;
};

export default TagTree;
