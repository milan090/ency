import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Dropdown: React.FC<Props> = ({ children }) => {
  return (
    <ul className="bg-white rounded-base shadow-xl absolute -top-1 -left-4 min-w-max z-10 pl-4 pr-6 pt-3 pb-4 flex flex-col gap-y-3">
      {children}
    </ul>
  );
};

type ItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const DropdownItem: React.FC<ItemProps> = ({ children, onClick, className }) => (
  <li
    className={`cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-200 ${className}`}
  >
    <button onClick={onClick}>{children}</button>
  </li>
);
