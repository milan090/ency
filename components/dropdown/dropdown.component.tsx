import React from "react";

type Props = {
  show?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Dropdown: React.FC<Props> = ({ show, children, className }) => {
  return (
    <ul
      className={`absolute bg-gray-50 overflow-hidden rounded-md z-10 shadow-md ${className} ${
        !show && "hidden"
      }`}
    >
      {children}
    </ul>
  );
};

export default Dropdown;
