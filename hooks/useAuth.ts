import { useEffect, useState } from "react";
import { db, auth } from "config/firebase";
import { IUser, SignInFunction, SignUpFunction, UseAuth } from "types/common";

export const useAuthProvider = (): UseAuth => {
  const [user, setUser] = useState<IUser>({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({ email: user.email || undefined, uid: user.uid });
      }
    });
  }, []);

  const createUser = (user: IUser): Promise<IUser | { error: any }> => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signUp: SignUpFunction = ({ email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        auth.currentUser?.sendEmailVerification();
        return createUser({ email, uid: res.user?.uid });
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn: SignInFunction = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user) throw Error("Something went wrong");
        const { email, uid } = res.user;
        setUser({ email: email || undefined, uid });
        return res.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  // const getUserAdditionalData = (user: firebase.User) => {
  //   return db
  //     .collection("users")
  //     .doc(user.uid)
  //     .get()
  //     .then((userData) => {
  //       if (userData.data()) {
  //         setUser(userData.data());
  //       }
  //     });
  // };

  return {
    user,
    signUp,
    signIn,
  };
};
