import { useAuth } from "hooks/useAuth.provider";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../components/custom-button/custom-button.component";
import CustomInput from "../components/custom-input/custom-input.component";
import Navbar from "../components/navbar/navbar.component";
import GoogleSignInButton from "components/google-sign-in/google-sign-in.component";
import { SignInFormInputs } from "types/forms.types";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";

export default function SignIn(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm<SignInFormInputs>();

  const router = useRouter();
  const { signIn, user } = useAuth();

  const onSubmit = (formInput: SignInFormInputs): void => {
    setIsLoading(true);
    signIn(formInput).catch((error) => {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setError("password", { message: "User with given password or email not found" });
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (user.uid) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div>
      <Head>
        <title>Sign In | Ency</title>
      </Head>
      <div
        style={{ backgroundImage: "url('./formpage-bg.svg')" }}
        className="bg-no-repeat min-h-screen h-full bg-cover bg-center"
      >
        <Navbar />
        <div className="w-full flex justify-center">
          <div className="max-w-md w-full bg-white rounded-md shadow-2xl pt-10 px-7 pb-8 mb-10">
            <h1 className="text-4xl font-bold pb-2">Sign In</h1>
            <p className="text-gray-500">Enter Your Account details</p>

            <form className="mt-8" noValidate>
              <CustomInput
                label="Your Email"
                type="email"
                name="email"
                placeHolder="Enter Your Email"
                error={errors.email?.message}
                fref={register({
                  required: "Field is required",
                })}
              />
              <CustomInput
                label="Your Password"
                type="password"
                name="password"
                placeHolder="Enter Your Password"
                error={errors.password?.message}
                fref={register({
                  required: "Field is required",
                })}
              />

              <CustomButton className="w-full mt-2" onClick={handleSubmit(onSubmit)}>
                {isLoading ? (
                  <div className="w-full flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  "Sign In"
                )}
              </CustomButton>
            </form>
            <p className="text-center w-full my-2">or</p>

            <span className="mb-5 block">
              <GoogleSignInButton />
            </span>

            <p className="text-center">
              Dont have an account?{" "}
              <Link href="/sign-up">
                <a className="text-blue-500 hover:underline">Sign Up</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
