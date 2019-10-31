import {
  Paper,
  Typography,
  Chip,
  createStyles,
  Theme,
  Icon,
  Link,
  Box,
  Fade,
  IconButton,
} from '@material-ui/core';
import { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { isEmpty } from 'lodash';
import { Bookmark } from 'src/models/Bookmark/Bookmark.model';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      height: '3rem',
      marginBottom: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    card: {
      padding: theme.spacing(2),
    },
  }),
);

const BookmarkCard: React.FC<Props> = ({
  bookmark,
  onViewClick,
  onEditClick,
}) => {
  const classes = useStyles();
  const handleViewClick = useCallback(() => {
    if (onViewClick) onViewClick(bookmark);
  }, [onViewClick, bookmark]);

  const handleEditClick = useCallback(() => {
    if (onEditClick) onEditClick(bookmark);
  }, [onEditClick, bookmark]);

  return (
    <Fade in>
      <Paper className={classes.card}>
        <Typography component="p" classes={{ root: classes.title }}>
          {bookmark.title}
        </Typography>
        <Box mb={2}>
          {bookmark.tags.map((tag) => (
            <Chip
              className={classes.chip}
              size="small"
              key={tag.title}
              label={tag.title}
              color="primary"
            />
          ))}
          {isEmpty(bookmark.tags) && (
            <Chip
              size="small"
              className={classes.chip}
              label="Without tag"
              color="default"
            />
          )}
        </Box>
        <Box>
          <Link href={bookmark.link} target="_blank" rel="noreferrer">
            <IconButton>
              <Icon className="fas fa-external-link-alt" fontSize="small" />
            </IconButton>
          </Link>
          <IconButton onClick={handleViewClick}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleEditClick}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Fade>
  );
};

type Props = {
  bookmark: Bookmark;
  onViewClick?: (bookmark: Bookmark) => void;
  onEditClick?: (bookmark: Bookmark) => void;
};

export default BookmarkCard;
