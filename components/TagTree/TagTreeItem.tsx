import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';
import { useCallback } from 'react';
import cn from 'classnames';
import { TagOption } from 'src/models/TagOption.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
      '&:focus > $content': {
        backgroundColor: theme.palette.grey[400],
      },
    },
    content: {
      color: theme.palette.text.primary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightRegular,
      padding: '5px 0',
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&$selected': {
        backgroundColor: theme.palette.grey[400],
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  }),
);

const TagTreeItem: React.FC<Props> = ({
  tag,
  children,
  selected,
  onTagSelect,
}) => {
  const classes = useStyles();

  const onItemClick = useCallback(() => {
    onTagSelect(tag);
  }, [onTagSelect, tag]);

  return (
    <TreeItem
      nodeId={tag.id + tag.title}
      label={tag.title}
      classes={{
        root: classes.root,
        content: cn(classes.content, { [classes.selected]: selected }),
        group: classes.group,
        expanded: classes.expanded,
        label: classes.label,
      }}
      onClick={onItemClick}
    >
      {children}
    </TreeItem>
  );
};

interface Props {
  tag: TagOption;
  selected: boolean;
  onTagSelect: (tag: TagOption) => void;
}

export default TagTreeItem;
