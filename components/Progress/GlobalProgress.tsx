import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import Progress from 'components/Progress/Progress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    globalLoader: {
      zIndex: theme.zIndex.appBar + 1,
    },
  }),
);

const GlobalProgress: React.FC = () => {
  const { logging } = useContext(AuthContext);
  const classes = useStyles();

  return <Progress open={logging} className={classes.globalLoader} />;
};

export default GlobalProgress;
