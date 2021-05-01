import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FormInput, FormPasswordInput } from "components/form-input/form-input.component";
import { useForm } from "react-hook-form";
import { BlueBGButtonWide } from "components/CustomButtons/bluebg-button.component";
import { GoogleSigninButton } from "components/google-signin-button/google-signin-button.component";
import { useRouter } from "next/dist/client/router";
import { signIn, useSession } from "next-auth/client";
import { AuthErrorCode } from "types/errors/auth.errors";

type FormInputs = {
  email: string;
  fname: string; // Full Name
  password: string;
};

export const SignUpLayout: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<FormInputs>();
  const [session] = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const onFormSubmit = async ({ fname, email, password }: FormInputs): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        name: fname,
        password,
        type: "SIGN_UP",
        redirect: false,
      });
      if (res?.error) throw new Error(res.error);
    } catch (error) {
      const code = error.message as AuthErrorCode;
      switch (code) {
        case "USER_ALREADY_EXISTS":
          setError("email", { message: "Account with this email already exists" });
          break;
        default:
          break;
      }
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
