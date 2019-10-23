import { UserState } from 'src/models/UserState.model';
import { createContext } from 'react';

export const AuthContext = createContext<UserState>({
  logging: false,
  user: null,
});
