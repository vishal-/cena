import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

interface UserContextType {
  user: User | null;
  userName: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userName: null
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
      setUserName(user ? user.user_metadata?.name || user.email : null);
    };

    getUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setUserName(
        session?.user
          ? session.user.user_metadata?.name || session.user.email
          : null
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userName }}>
      {children}
    </UserContext.Provider>
  );
};
