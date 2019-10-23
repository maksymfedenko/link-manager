import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/styles';
import cn from 'classnames';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progressWrapper: {
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndex.appBar + 1,
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

const GlobalProgress: React.FC<{ open: boolean }> = ({ open }) => {
  const classes = useStyles();

  return (
    <div
      className={cn(classes.progressWrapper, {
        [classes.progressWrapperOpen]: open,
      })}
    >
      <CircularProgress size={60} color="secondary" />
    </div>
  );
};

export default GlobalProgress;
