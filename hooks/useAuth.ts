import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { db, auth, googleAuthProvider } from "config/firebase";
import {
  IUser,
  SignInFunction,
  SignInWithGoogle,
  SignOutFunction,
  SignUpFunction,
  UseAuth,
} from "types/common.types";
import { SignInFormInputs, SignUpFormInputs } from "types/forms.types";
import { useRouter } from "next/router";

export const useAuthProvider = (): UseAuth => {
  const [user, setUser] = useState<IUser>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isConfirmingEmail = router.query["confirm_email"];
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      if (userData) {
        const isVerified: boolean = userData.emailVerified;
        userData.getIdToken(!!isConfirmingEmail).then(() => {
          userData.reload().then(() => {
            setUser({
              email: userData.email || undefined,
              uid: userData.uid,
              isVerified: isVerified,
            });
            getUserAdditionalData(userData);
            setIsLoading(false);
          });
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router.query]);

  const createUser = (user: IUser): Promise<IUser | { error: Error }> => {
    return db
      .collection("users")
      .doc(user.uid)
      .set(user)
      .then(() => {
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signInWithGoogle: SignInWithGoogle = () => {
    return auth
      .signInWithPopup(googleAuthProvider)
      .then((res) => {
        if (!res.user) throw new Error("Something went wrong");
        const { uid, displayName, email } = res.user;
        createUser({ uid, name: displayName || undefined, email: email || undefined });
      })
      .catch((error) => {
        return { error };
      });
  };

  const signUp: SignUpFunction = ({ email, password, name }: SignUpFormInputs) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      res.user?.sendEmailVerification({
        url: `${location.protocol}//${location.host}/dashboard?confirm_email=true`,
      });
      return createUser({ email, uid: res.user?.uid, name });
    });
  };

  const signIn: SignInFunction = ({ email, password }: SignInFormInputs) => {
    return auth.signInWithEmailAndPassword(email, password).then((res) => {
      if (!res.user) throw Error("Something went wrong");
      const { email, uid } = res.user;
      setUser({ email: email || undefined, uid, isVerified: res.user.emailVerified });
      getUserAdditionalData(res.user);
      return res.user;
    });
  };

  const signOut: SignOutFunction = () => {
    setIsLoading(true);
    return auth
      .signOut()
      .then(() => setUser({}))
      .finally(() => setIsLoading(false));
  };

  const getUserAdditionalData = (user: firebase.User): void => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userData) => {
        if (userData.data()) {
          setUser({ ...(userData.data() as IUser), isVerified: user.emailVerified });
        }
      });
  };

  return {
    user,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    isLoading,
  };
};
