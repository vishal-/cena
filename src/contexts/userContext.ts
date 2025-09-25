import { createContext } from "react";
import type { Models } from "appwrite";

export interface UserContextType {
  user: Models.User<Models.Preferences> | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async () => {},
  logout: async () => {}
});