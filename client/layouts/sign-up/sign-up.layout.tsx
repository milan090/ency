import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FormInput, FormPasswordInput } from "components/form-input/form-input.component";
import { useForm } from "react-hook-form";
import { BlueBGButtonWide } from "components/CustomButtons/bluebg-button.component";
import { GoogleSigninButton } from "components/google-signin-button/google-signin-button.component";
import { signUpWithEmailAndPassword } from "utils/auth.utils";
import { useAuth } from "hooks/auth.hook";
import { useRouter } from "next/dist/client/router";

type FormInputs = {
  email: string;
  fname: string; // Full Name
  password: string;
};

export const SignUpLayout: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormInputs>();
  const setUser = useAuth((state) => state.setUser);
  const user = useAuth((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.uid) {
      router.push("/dashboard");
    }
  }, [user]);

  const onFormSubmit = async ({ fname, email, password }: FormInputs): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await signUpWithEmailAndPassword(fname, email, password);
      {
        const { email, uid, name } = data;
        setUser({ email, uid, name });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

            <div className="mt-10 mb-4">
              {isLoading ? (
                <BlueBGButtonWide>Loading....</BlueBGButtonWide>
              ) : (
                <BlueBGButtonWide type="submit">Sign Up</BlueBGButtonWide>
              )}
            </div>
          </form>
          <GoogleSigninButton />
        </section>
      </div>
    </div>
  );
};
