import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/styles';
import cn from 'classnames';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressWrapper: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: theme.palette.background.default,
      visibility: 'hidden',
      transition: `opacity ${theme.transitions.duration.standard} ${theme.transitions.easing.easeOut}, visibility ${theme.transitions.duration.standard} step-end`,
      opacity: 0,
    },
    progressWrapperOpen: {
      visibility: 'visible',
      opacity: 1,
      transition: `opacity ${theme.transitions.duration.standard} ${theme.transitions.easing.easeIn}`,
    },
  }),
);

const Progress: React.FC<Props> = ({ open, className, size = 60 }) => {
  const classes = useStyles();

  return (
    <div
      className={cn(classes.progressWrapper, className, {
        [classes.progressWrapperOpen]: open,
      })}
    >
      <CircularProgress size={size} color="secondary" />
    </div>
  );
};

type Props = {
  open: boolean;
  className?: string;
  size?: number;
};

export default Progress;
