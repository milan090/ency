import { SignInFormInputs, SignUpFormInputs } from "./forms.types";
import firebase from "firebase/app";

export interface IUser {
  name?: string;
  email?: string;
  uid?: string;
  isVerified?: boolean;
}

export type SignUpFunction = (
  formInput: SignUpFormInputs
) => Promise<IUser | { error: any } | null>;

export type SignInFunction = (
  formInput: SignInFormInputs
) => Promise<firebase.User | { error: any } | null>;

export type SignOutFunction = () => Promise<void>;

export type SignInWithGoogle = () => Promise<IUser | { error: any } | void>;

export interface UseAuth {
  user: IUser;
  signUp: SignUpFunction;
  signIn: SignInFunction;
  signOut: SignOutFunction;
  signInWithGoogle: SignInWithGoogle;
  isLoading: boolean;
}

export interface UseAutoSave {
  notSaved: string[];
  addItemToSave: (item: string) => void;
  removeItemToSave: (item: string) => void;
}

export interface UseProject {
  projectRef: FirebaseDocRef | undefined;
  setProjectRef: (ref: FirebaseDocRef | undefined) => void;
}

export type FirebaseDocRef = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
