import { UserContext } from 'src/models/UserContext.model';
import { createContext } from 'react';

export const AuthContext = createContext<UserContext>({
  logging: true,
  user: undefined,
  signOut: () => {},
  signIn: () => {},
});
