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
  Avatar,
  TextField,
  Link,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState, useCallback, useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import { ChangeThemeContext } from 'src/contexts/ChangeThemeContext';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { debounce } from 'lodash';
import IndigoPalette from '@material-ui/core/colors/indigo';
import LinkNext from 'next/link';
import GlobalSearch from './GlobalSearch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightContent: {
      marginLeft: 'auto',
    },
    search: {
      marginLeft: theme.spacing(3),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: IndigoPalette[400],
    },
    searchFormControl: {
      color: theme.palette.common.white,
    },
    themeButton: {
      marginRight: theme.spacing(1),
    },
    link: {
      margin: theme.spacing(1),
    },
    clearIcon: {
      color: theme.palette.common.white,
    },
  }),
);

const Header = () => {
  const classes = useStyles();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [search, setSearch] = useState<string>('');
  const [globalSearch, setGlobalSearch] = useState<string>('');
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
        <Avatar src={user!.picture} />
      </IconButton>
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={closeUserMenu}
      >
        <MenuItem onClick={onSignOut}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );

  const debouncedSetGlobalSearch = useCallback(
    debounce<(value: string) => void>((newSearch) => {
      setGlobalSearch(newSearch);
    }, 500),
    [setGlobalSearch],
  );

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearch(value);
      debouncedSetGlobalSearch(value);
    },
    [debouncedSetGlobalSearch],
  );

  const clearSearch = useCallback(() => {
    setSearch('');
    setGlobalSearch('');
  }, [setSearch, setGlobalSearch]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <LinkNext href="/">
            <Link color="inherit" underline="none">
              <Typography variant="h6">Link Manager</Typography>
            </Link>
          </LinkNext>
          {user && (
            <TextField
              inputProps={{ onChange: onSearch }}
              value={search}
              placeholder="Search"
              classes={{ root: classes.search }}
              InputProps={{
                classes: { formControl: classes.searchFormControl },
                disableUnderline: true,
                endAdornment: Boolean(search) && (
                  <IconButton className={classes.clearIcon} size="small">
                    <ClearIcon onMouseUp={clearSearch} fontSize="small" />
                  </IconButton>
                ),
              }}
            />
          )}
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
      {user && <GlobalSearch search={globalSearch} />}
    </>
  );
};

export default Header;
