import AppBar from '@material-ui/core/AppBar';
import {
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { useState, useCallback, useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { ChangeThemeContext } from 'src/contexts/ChangeThemeContext';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightContent: {
      marginLeft: 'auto',
    },
    themeButton: {
      marginRight: theme.spacing(1),
    },
    link: {
      margin: theme.spacing(1),
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const { user, signOut, signIn } = useContext(AuthContext);
  const { toggleTheme } = useContext(ChangeThemeContext);

  const openUserMenu = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(e.currentTarget);
  }, []);

  const closeUserMenu = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  const onSignOut = useCallback(() => {
    closeUserMenu();
    signOut();
  }, [signOut]);

  const renderUserDropdown = () => (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openUserMenu}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={closeUserMenu}
      >
        <MenuItem onClick={closeUserMenu}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Link Manager</Typography>

        <div className={classes.rightContent}>
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            className={classes.themeButton}
          >
            <InvertColorsIcon />
          </IconButton>
          {user ? (
            renderUserDropdown()
          ) : (
            <Button variant="contained" color="secondary" onClick={signIn}>
              LOGIN
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
