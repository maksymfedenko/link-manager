import { Box, Typography } from '@material-ui/core';
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

const AccessGuard: React.FC<Props> = ({
  message,
  isAccessDenied,
  children,
}) => {
  const classes = useStyles();

  if (!isAccessDenied) return children;

  return (
    <Box className={classes.root}>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

type Props = {
  children: JSX.Element;
  isAccessDenied?: boolean;
  message: string;
};

export default AccessGuard;
