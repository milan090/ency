import { SignInFormInputs } from "./forms";
import firebase from "firebase";

export interface IUser {
  email?: string;
  uid?: string;
}

export type SignUpFunction = (
  formInput: SignUpFormInputs
) => Promise<IUser | { error: any } | null>;

export type SignInFunction = (
  formInput: SignInFormInputs
) => Promise<firebase.User | { error: any } | null>;

export interface UseAuth {
  user: IUser;
  signUp: SignUpFunction;
  signIn: SignInFunction;
}
