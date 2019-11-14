import {
  Paper,
  Typography,
  Chip,
  createStyles,
  Theme,
  Box,
  Fade,
} from '@material-ui/core';
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
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    card: {
      padding: theme.spacing(1),
    },
  }),
);

const BookmarkMiniCard: React.FC<Props> = ({ bookmark }) => {
  const classes = useStyles();

  return (
    <Fade in>
      <Paper className={classes.card}>
        <Typography variant="body1" classes={{ root: classes.title }}>
          {bookmark.title}
        </Typography>
        <Box>
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
      </Paper>
    </Fade>
  );
};

type Props = {
  bookmark: Bookmark;
};

export default BookmarkMiniCard;
