import { AxiosResponse } from "axios";
import { axios } from "config/axios";
import { auth, firebase } from "config/firebase";
import { UserEntity } from "types/auth.types";

export const signUpWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
): Promise<UserEntity> => {
  const { data } = await createUser({ email, name, password });
  await auth.signInWithEmailAndPassword(email, password);
  return data;
};

const createUser = ({
  email,
  name,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<AxiosResponse<UserEntity>> => {
  return axios.post("/auth/email", {
    name,
    email,
    password,
  });
};

export const logout = async (): Promise<void> => {
  await auth.signOut();
};

export const loginWithEmailAndPassword = (
  email: string,
  password: string
): Promise<void | firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(email, password).catch(console.log);
};
