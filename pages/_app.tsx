import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import themes, { ThemeTypes } from 'src/themes';
import MainLayout from 'components/Layouts/MainLayout';
import { ChangeThemeContext } from 'src/contexts/ChangeThemeContext';

export default class MyApp extends App<any, any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      theme: ThemeTypes.light,
    };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  toggleTheme = () => {
    this.setState((state) => ({
      theme:
        state.theme === ThemeTypes.light ? ThemeTypes.dark : ThemeTypes.light,
    }));
  };

  render() {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;

    return (
      <>
        <Head>
          <title>Link Manager</title>
        </Head>
        <ThemeProvider theme={themes[theme]}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <ChangeThemeContext.Provider
            value={{ toggleTheme: this.toggleTheme }}
          >
            <MainLayout>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </MainLayout>
          </ChangeThemeContext.Provider>
        </ThemeProvider>
      </>
    );
  }
}

type State = { theme: ThemeTypes };
