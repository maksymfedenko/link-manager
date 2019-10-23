import { Auth0UserProfile } from 'auth0-js';

export interface UserContext {
  logging: boolean;
  user: Auth0UserProfile | undefined;
  signOut: () => void;
  signIn: () => void;
}
