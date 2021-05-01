import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FormInput,
  FormPasswordInput,
} from "src/client/components/form-input/form-input.component";
import { useForm } from "react-hook-form";
import { BlueBGButtonWide } from "src/client/components/CustomButtons/bluebg-button.component";
import { GoogleSigninButton } from "src/client/components/google-signin-button/google-signin-button.component";
import { useRouter } from "next/dist/client/router";
import { signIn, useSession } from "next-auth/client";
import { AuthErrorCode } from "src/types/errors/auth.errors";

type FormInputs = {
  email: string;
  password: string;
};

export const LoginLayout: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<FormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();

  const onFormSubmit = async ({ email, password }: FormInputs): Promise<void> => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await signIn("credentials", { type: "LOGIN", email, password, redirect: false });
      if (res?.error) throw new Error(res.error);
    } catch (error) {
      const code = error.message as AuthErrorCode;
      switch (code) {
        case "EMAIL_PASSWORD_DOESNT_EXIST":
          setError("password", { message: "Invalid email/password entered" });
          break;
        default:
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && session?.user) {
      router.push("/dashboard");
    }
  }, [session, loading, router]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-2/3 flex">
        <section>
          <h1 className="font-extrabold text-4xl mb-4">Login</h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up">
              <a className="text-blue-500 hover:underline">Sign Up</a>
            </Link>
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)} noValidate={true} className="mt-5">
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
              })}
            />

            <p className="text-sm text-blue-500 hover:underline float-right mb-10">
              Forgot Password?
            </p>

            <div className="mt-8 mb-4">
              {!isLoading ? (
                <BlueBGButtonWide type="submit">Sign In</BlueBGButtonWide>
              ) : (
                <BlueBGButtonWide>Loading...</BlueBGButtonWide>
              )}
            </div>
          </form>
          <GoogleSigninButton />
        </section>
      </div>
    </div>
  );
};
