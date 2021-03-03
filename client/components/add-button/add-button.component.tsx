import React, { useState } from "react";
import { Plus } from "react-feather";

type Props = {
  onClick: () => void;
};

const AddButton: React.FC<Props> = ({ ...props }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="rounded-full shadow-xl w-10 h-10 bg-black hover:bg-white transition-all duration-300 ease-in-out hover:text-black focus:outline-none outline-none"
      {...props}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <Plus color={hovered ? "black" : "white"} className="mx-auto" size="26" strokeWidth="3.2" />
    </button>
  );
};

export default AddButton;
