import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rightContent: {
      marginLeft: "auto"
    },
    link: {
      margin: theme.spacing(1),
    },
  })
);

const Header = () => {
  const classes = useStyles();

  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  const openUserMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchor(e.currentTarget);
  };

  const closeUserMenu = () => {
    setUserMenuAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Link Manager</Typography>
        <Typography>
          <Link href="/">
            <a className={classes.link}>home</a>
          </Link>
        </Typography>

        <div className={classes.rightContent}>
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
            <MenuItem disabled onClick={closeUserMenu}>
              Setting
            </MenuItem>
            <MenuItem onClick={closeUserMenu}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
