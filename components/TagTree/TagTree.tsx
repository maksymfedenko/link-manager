import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { isEmpty, get } from 'lodash';
import { Typography, Box } from '@material-ui/core';
import TagTreeItem from 'components/TagTree/TagTreeItem';
import { Tag } from 'src/models/Tag.model';

const EndIcon = () => <div style={{ width: 24 }} />;

const data: Tag[] = [
  {
    id: '1',
    title: 'Applications',
    tags: [
      {
        title: 'Calendar',
        id: '2',
      },
      {
        title: 'Chrome',
        id: '3',
      },
      {
        title: 'Webstorm',
        id: '4',
      },
      {
        title: 'Material-UI',
        id: '6',
        tags: [
          {
            title: 'index.js',
            id: '7',
          },
          {
            title: 'tree-view.js',
            id: '8',
          },
        ],
      },
    ],
  },
  {
    title: 'Documents',
    id: '5',
  },
];

const renderTags = (tags: Tag[] | undefined, props: Props) => {
  if (isEmpty(tags)) return undefined;

  return tags!.map((tag) => (
    <TagTreeItem
      key={tag.id}
      tag={tag}
      selected={tag.id === get(props.selectedTag, 'id')}
      onTagSelect={props.onTagSelect}
    >
      {renderTags(tag.tags, props)}
    </TagTreeItem>
  ));
};

const TagTree: React.FC<Props> = (props) => {
  return (
    <>
      <Box mb={1}>
        <Typography variant="h6">Tags</Typography>
      </Box>
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<EndIcon />}
      >
        {renderTags(data, props)}
      </TreeView>
    </>
  );
};

type Props = {
  selectedTag?: Tag;
  onTagSelect: (selectedTag: Tag) => void;
};

export default TagTree;
