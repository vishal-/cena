import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export interface UserContextType {
  user: User | null;
  userName: string | null;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  userName: null
});
