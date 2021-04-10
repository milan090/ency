import create from "zustand";
import { IUser } from "types/auth.types";

type UseAuthState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user: IUser;
  setUser: (user: IUser) => void;
  token: string;
  setToken: (token: string) => void;
};

export const useAuth = create<UseAuthState>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading: isLoading })),
  user: {},
  setUser: (user: IUser) => set((state) => ({ user: { ...state.user, ...user } })),
  token: "",
  setToken: (token: string) => set(() => ({ token: token })),
}));
