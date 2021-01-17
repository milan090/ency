import { useContext, createContext, ReactNode } from "react";
import { useAuthProvider } from "./useAuth";
import { UseAuth } from "types/common.types";

const authContext = createContext<UseAuth>({
  user: {},
  signUp: async () => null,
  signIn: async () => null,
  isLoading: true,
  signOut: async () => {
    // pass
  },
  signInWithGoogle: async () => {
    // pass
  },
});

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
