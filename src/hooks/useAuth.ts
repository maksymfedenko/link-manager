import { UserState } from 'src/models/UserState.model';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import firebase from 'src/firebase';

const useAuth = (): UserState => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [logging, setLogging] = useState<boolean>(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (process.browser) {
      const unsubscribeFn = firebase.auth().onAuthStateChanged((newUser) => {
        setLogging(false);
        setUser(newUser);

        if (newUser) {
          Cookies.set('firebaseId', newUser.uid);
        } else {
          Cookies.remove('firebaseId');
        }
      });

      return () => unsubscribeFn();
    }
  }, []);

  return { user, logging };
};

export default useAuth;
