import { useAuth } from "hooks/useAuth.provider";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../components/custom-button/custom-button.component";
import CustomInput from "../components/custom-input/custom-input.component";
import Navbar from "../components/navbar/navbar.component";
import GoogleSignInButton from "components/google-sign-in/google-sign-in.component";

interface FormInputs {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, errors } = useForm<FormInputs>();

  const router = useRouter();
  const { signIn, user } = useAuth();

  const onSubmit = (formInput: FormInputs): void => {
    signIn(formInput).then((res) => console.log(res));
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

            <div className="mt-8">
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
                Sign In
              </CustomButton>

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
    </div>
  );
}
