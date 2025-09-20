import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { account } from "../utils/appwrite";
import type { Models } from "appwrite";
import { OAuthProvider } from "appwrite";
import { UserContext } from "./userContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
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

    // Refetch user when window regains focus (useful after OAuth redirect)
    const handleFocus = () => {
      fetchUser();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const login = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        window.location.origin,
        window.location.origin + "/#/auth"
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

export default UserProvider;
