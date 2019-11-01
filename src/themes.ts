import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const lightTheme = createMuiTheme({});
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export enum ThemeTypes {
  light = 'light',
  dark = 'dark',
}

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;
