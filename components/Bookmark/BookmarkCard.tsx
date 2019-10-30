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
} from '@material-ui/core';
import { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { isEmpty } from 'lodash';
import { Bookmark } from 'src/models/Bookmark/Bookmark.model';

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
    card: {
      padding: theme.spacing(2),
    },
  }),
);

const BookmarkCard: React.FC<Props> = ({ bookmark, onCardClick }) => {
  const classes = useStyles();
  const onClick = useCallback(() => {
    if (onCardClick) onCardClick(bookmark.id);
  }, [onCardClick, bookmark]);

  return (
    <Fade in>
      <Paper className={classes.card} onClick={onClick}>
        <Typography component="p" classes={{ root: classes.title }}>
          {bookmark.title}
        </Typography>
        <Box mb={2}>
          {bookmark.tags.map((tag) => (
            <Chip
              size="small"
              key={tag.title}
              label={tag.title}
              color="primary"
            />
          ))}
          {isEmpty(bookmark.tags) && (
            <Chip size="small" label="Without tag" color="default" />
          )}
        </Box>
        <Box>
          <Link href={bookmark.link} target="_blank" rel="noreferrer">
            <Icon className="fas fa-external-link-alt" fontSize="small" />
          </Link>
        </Box>
      </Paper>
    </Fade>
  );
};

type Props = {
  bookmark: Bookmark;
  onCardClick?: (bookmarkId: string) => void;
};

export default BookmarkCard;
