import React from "react";

type Props = {
  children: React.ReactNode;
  handleClick?: () => void;
  type?: "submit" | "reset" | "button";
};

export const BlueBGButton: React.FC<Props> = ({ children, handleClick = () => {}, type }) => {
  return (
    <button
      className="border-2 border-blue-400 text-white bg-blue-400 rounded-full px-5 py-1 transition-colors duration-300 ease-in-out
      hover:text-blue-500 hover:bg-white"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export const BlueBGButtonLg: React.FC<Props> = ({ children, handleClick = () => {}, type }) => {
  return (
    <button
      className="border-2 border-blue-400 text-white bg-blue-400 rounded-full px-6 py-2 transition-colors duration-300 ease-in-out
    hover:text-blue-500 hover:bg-white"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export const BlueBGButtonWide: React.FC<Props> = ({ children, handleClick = () => {}, type }) => {
  return (
    <button
      className="border-2 border-blue-400 text-white bg-blue-400 rounded-lg px-6 py-2.5 transition-colors duration-300 ease-in-out
    hover:text-blue-500 hover:bg-white w-full flex justify-center items-center focus:outline-none"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};
