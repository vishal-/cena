import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { account } from "../utils/appwrite";
import type { Models } from "appwrite";
import { OAuthProvider } from "appwrite";

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

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:3000",
        "http://localhost:3000/logout"
      );
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
