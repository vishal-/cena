import { createContext } from "react";
import { Account } from "appwrite";
import { client } from "../utils/appwrite";

export interface UserContextType {
  user: any | null; // Replace 'any' with the appropriate Appwrite user type
  userName: string | null;
}

const account = new Account(client);

export const UserContext = createContext<UserContextType>({
  user: null,
  userName: null
});

export async function fetchUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
}
