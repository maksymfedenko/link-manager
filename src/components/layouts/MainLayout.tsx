import Header from 'src/components/Header';
import { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import useAuth from 'src/hooks/useAuth';
import { AuthContext } from 'src/contexts/AuthContext';
import LoginDialog from 'src/components/LoginDialog';
import GlobalProgress from 'src/components/GlobalProgress';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      overflowY: 'auto',
    },
  }),
);

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const userState = useAuth();

  return (
    <div className={classes.root}>
      <AuthContext.Provider value={userState}>
        <Header />
        <main className={classes.content}>{children}</main>
        <GlobalProgress open={userState.logging} />
        <LoginDialog open={!userState.logging && !userState.user} />
      </AuthContext.Provider>
    </div>
  );
};

type Props = {
  children: ReactNode;
};

export default MainLayout;
