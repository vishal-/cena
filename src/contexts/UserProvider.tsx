import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import type { User } from "@supabase/supabase-js";
import { UserContext } from "./userContext";

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
