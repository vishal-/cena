import React, { useState, useEffect } from "react";
import { account } from "../utils/appwrite";
import type { Models } from "appwrite";
import { UserContext } from "./userContext";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
        setUserName(user ? user.name || user.email : null);
      } catch {
        setUser(null);
        setUserName(null);
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, userName }}>
      {children}
    </UserContext.Provider>
  );
};
