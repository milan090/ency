import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../components/custom-button/custom-button.component";
import CustomInput from "../components/custom-input/custom-input.component";
import Navbar from "../components/navbar/navbar.component";

interface FormInputs {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, errors } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs): void => console.log(data);

  return (
    <div>
      <Head>
        <title>Sign In | Ency</title>
      </Head>
      <div
        style={{ backgroundImage: "url('./home/landing-page.svg')" }}
        className="bg-no-repeat min-h-screen h-full bg-cover bg-center"
      >
        <Navbar />
        <div className="mt-10 w-full flex justify-center">
          <div className="max-w-6xl w-full mx-10">
            <div className="max-w-xs w-full">
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

                <CustomButton className="w-full">Sign In</CustomButton>

                <p className="text-center w-full my-4">or</p>

                <CustomButton
                  className="w-full bg-white mb-10"
                  bgColor="white"
                  // purgecss: bg-white hover:bg-white
                  color="primary"
                  // purgecss: text-primary
                  transitionBgColor="primary"
                  // purgecss: hover:bg-primary
                  transitionColor="white"
                  // purgecss: hover:text-white
                  onClick={handleSubmit(onSubmit)}
                >
                  <span>
                    <img
                      src="./other/google-icon.svg"
                      alt="googles logo"
                      width="24px"
                      className="inline-block mr-3 bg-white p-0.5 rounded"
                    />
                    Sign In With Google
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
