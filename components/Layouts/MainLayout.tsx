import Header from 'components/Header';
import { ReactNode } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Auth from 'components/Auth';
import GlobalProgress from 'components/Progress/GlobalProgress';

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
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

const MainLayout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Auth>
        <Header />
        <main className={classes.content}>{children}</main>
        <GlobalProgress />
      </Auth>
    </div>
  );
};

type Props = {
  children: ReactNode;
};

export default MainLayout;
