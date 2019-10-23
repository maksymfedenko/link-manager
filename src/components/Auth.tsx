import { useState, ReactNode, useEffect, useCallback } from 'react';
import Auth0, { Auth0UserProfile } from 'auth0-js';
import { AuthContext } from 'src/contexts/AuthContext';
import Cookies from 'js-cookie';
import { get } from 'lodash';

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Auth0UserProfile>();
  const [authClient, setAuthClient] = useState<Auth0.WebAuth>();
  const [logging, setLogging] = useState<boolean>(true);

  const getToken = useCallback((): string | undefined => {
    let token = Cookies.get('token');
    if (!token && window.location.href.includes('token')) {
      authClient!.parseHash(
        { hash: window.location.hash },
        (err, authResult) => {
          token = get(authResult, 'accessToken', '');
          Cookies.set('token', token);
        },
      );

      window.history.replaceState(
        '',
        document.title,
        window.location.pathname + window.location.search,
      );
    }
    return token;
  }, [authClient]);

  const signOut = useCallback(() => {
    Cookies.remove('token');
    authClient!.logout({});
  }, [authClient]);

  const signIn = useCallback(() => {
    if (user) return;
    authClient!.authorize();
  }, [authClient]);

  useEffect(() => {
    if (process.browser) {
      const auth = new Auth0.WebAuth({
        domain: 'dev-d1pchop0.eu.auth0.com',
        clientID: 'goj97hU7Fm3CWoB9b7iMbBrYG9g24new',
        redirectUri: window.location.origin,
        responseType: 'token',
      });
      setAuthClient(auth);
    }
  }, []);

  useEffect(() => {
    if (!authClient) return;
    const token = getToken();

    if (!token) return setLogging(false);

    authClient.client.userInfo(token, (error, userInfo) => {
      if (error) return signOut();
      setUser(userInfo);
      setLogging(false);
    });
  }, [authClient]);

  return (
    <AuthContext.Provider value={{ user, logging, signOut, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
