import CustomButton from "components/custom-button/custom-button.component";
import { useAuth } from "hooks/useAuth.provider";
import React from "react";

const GoogleSignInButton: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const handleClick = () => {
    signInWithGoogle();
  };
  return (
    <CustomButton
      // purge-css dynmic classes already defined in ./sign-in.tsx
      className="w-full bg-white border"
      bgColor="white"
      // purge-css: bg-white
      color="primary"
      // purge-css: text-primary
      transitionBgColor="primary"
      // purge-css: hover:bg-primary
      transitionColor="white"
      // purge-css: hover:text-white
      onClick={handleClick}
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
  );
};

export default GoogleSignInButton;
