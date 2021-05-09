import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import React from "react";

export const GoogleSigninButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className={`border-2 border-gray-400 text-black rounded-lg px-6 py-2.5 transition-colors duration-300 ease-in-out
    hover:text-blue-500 hover:bg-white w-full flex justify-center items-center focus:outline-none`}
      onClick={() =>
        signIn("google", {
          callbackUrl: `${router.query.redirectURL}`,
        })
      }
    >
      <img src="/images/other/google.svg" alt="google logo" width="20px" className="mr-4" />
      Continue With Google
    </button>
  );
};
