import Head from "next/head";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "components/custom-button/custom-button.component";
import CustomInput from "components/custom-input/custom-input.component";
import Navbar from "components/navbar/navbar.component";

const emailValidateRegex = /@/;

import { SignUpFormInputs } from "types/forms";
import { useAuth } from "hooks/useAuth.provider";
import { useRouter } from "next/router";

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, errors, watch } = useForm<SignUpFormInputs>();
  const { signUp, user } = useAuth();

  const router = useRouter();

  const onSubmit = (formInput: SignUpFormInputs): void => {
    signUp(formInput).then((res) => {
      console.log(res);
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
        <title>Sign Up | Ency</title>
      </Head>
      <div
        style={{ backgroundImage: "url('./home/landing-page.svg')" }}
        className="bg-no-repeat min-h-screen h-full bg-cover bg-center"
      >
        <Navbar />
        <div className="mt-10 w-full flex justify-center">
          <div className="max-w-6xl w-full mx-10">
            <div className="max-w-xs w-full">
              <h1 className="text-4xl font-bold pb-2">Sign Up</h1>
              <p className="text-gray-500">Create an account</p>

              <div className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label="Your Email"
                  type="email"
                  name="email"
                  placeHolder="Enter Your Email"
                  error={errors.email?.message}
                  fref={register({
                    required: "Field is required",
                    pattern: {
                      value: emailValidateRegex,
                      message: "Invalid email",
                    },
                  })}
                />
                <CustomInput
                  label="Password"
                  type="password"
                  name="password"
                  placeHolder="Enter Your Password"
                  error={errors.password?.message}
                  fref={register({
                    required: "Field is required",
                    min: {
                      value: 6,
                      message: "Password should be atleast 6 characters or longer (max 20)",
                    },
                    max: {
                      value: 20,
                      message: "Password should be atleast 6 characters or longer (max 20)",
                    },
                    validate: {
                      hasLetters: (value) =>
                        /[a-z]/i.test(value) || "Password should containe atleast on Alphabet",
                      hasNumbers: (value) =>
                        /[0-9]/.test(value) || "Password should contain atleast one Number",
                    },
                  })}
                />
                <CustomInput
                  label="Confirm Password"
                  type="password"
                  name="cpassword"
                  placeHolder="Enter Your Password Again"
                  error={errors.cpassword?.message}
                  fref={register({
                    required: "Field is required",
                    validate: {
                      matchesPass: (value) => watch("password") === value || "Passwords dont match",
                    },
                  })}
                />

                <CustomButton className="w-full" onClick={handleSubmit(onSubmit)}>
                  Sign Up
                </CustomButton>

                <p className="text-center w-full my-4">or</p>

                <CustomButton
                  // purge-css dynmic classes already defined in ./sign-in.tsx
                  className="w-full bg-white mb-10"
                  bgColor="white"
                  color="primary"
                  transitionBgColor="primary"
                  transitionColor="white"
                >
                  <span>
                    <img
                      src="./other/google-icon.svg"
                      alt="googles logo"
                      width="24px"
                      className="inline-block mr-3 bg-white p-0.5 rounded"
                    />
                    Sign Up With Google
                  </span>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
