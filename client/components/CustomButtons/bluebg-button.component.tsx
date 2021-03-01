import React from "react";

type Props = {
  children: React.ReactNode;
  handleClick?: () => void;
};

export const BlueBGButton: React.FC<Props> = ({ children, handleClick = () => {} }) => {
  return (
    <button
      className="border-2 border-blue-400 text-white bg-blue-400 rounded-full px-5 py-1 transition-colors duration-300 ease-in-out
      hover:text-blue-500 hover:bg-white"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const BlueBGButtonLg: React.FC<Props> = ({ children, handleClick = () => {} }) => {
  return (
    <button
      className="border-2 border-blue-400 text-white bg-blue-400 rounded-full px-6 py-2 transition-colors duration-300 ease-in-out
    hover:text-blue-500 hover:bg-white"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
