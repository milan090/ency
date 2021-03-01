import React from "react";
import Link from "next/link";
import { FormInput, FormPasswordInput } from "components/form-input/form-input.component";
import { useForm } from "react-hook-form";
import { BlueBGButtonWide } from "components/CustomButtons/bluebg-button.component";
import { GoogleSigninButton } from "components/google-signin-button/google-signin-button.component";

type FormInputs = {
  email: string;
  fname: string;
  password: string;
};

export const SignUpLayout: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormInputs>();

  const onFormSubmit = (data: FormInputs): void => {
    console.log(data);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3 flex justify-end">
        <section>
          <h1 className="font-extrabold text-4xl mb-4">Sign Up To Ency</h1>
          <p className="text-sm text-gray-500">
            Have an account?{" "}
            <Link href="/login">
              <a className="text-blue-500 hover:underline">Log In</a>
            </Link>
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate={true} className="mt-5">
            <FormInput
              label="Full Name"
              name="fname"
              type="text"
              placeholder="Enter your name"
              error={errors.fname?.message}
              fref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              placeholder="Example@email.com"
              error={errors.email?.message}
              fref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message: "Invalid email",
                },
              })}
            />
            <FormPasswordInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              error={errors.password?.message}
              fref={register({
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 6,
                  message: "Password should be atleast 6 characters long",
                },
              })}
            />

            <div className="mt-8 mb-4">
              <BlueBGButtonWide type="submit">Sign Up</BlueBGButtonWide>
            </div>
          </form>
          <GoogleSigninButton />
        </section>
      </div>
    </div>
  );
};
