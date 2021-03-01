import React from "react";

type Props = {
  children: React.ReactNode;
  handleClick?: () => void;
};

export const WhiteBGButton: React.FC<Props> = ({ children, handleClick = () => {} }) => {
  return (
    <button
      className="border-2 border-blue-400 text-blue-500 rounded-full px-5 py-1 transition-colors duration-300 ease-in-out
      hover:text-white hover:bg-blue-400"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const WhiteBGButtonLg: React.FC<Props> = ({ children, handleClick = () => {} }) => {
  return (
    <button
      className="border-2 border-blue-400 text-blue-500 rounded-full px-6 py-2 transition-colors duration-300 ease-in-out
      hover:text-white hover:bg-blue-400"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
