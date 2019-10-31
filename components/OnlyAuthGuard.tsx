import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
  }),
);

const OnlyAuthGuard: React.FC<Props> = ({ children }) => {
  const { user, signIn } = useContext(AuthContext);
  const classes = useStyles();

  if (user) return children;

  return (
    <Box className={classes.root}>
      <Typography variant="h6">To access content, please login</Typography>
      <Button variant="contained" color="secondary" onClick={signIn}>
        LOGIN
      </Button>
    </Box>
  );
};

type Props = {
  children: JSX.Element;
};

export default OnlyAuthGuard;
