import React from "react";

import { overrideTailwindClasses } from "tailwind-override";

type Props = {
  label: string;
  placeHolder: string;
  type: "text" | "password" | "email";
  name: string;
  error: string | undefined;
  className?: string;
  fref: any;
};

const CustomInput: React.FC<Props> = ({
  label,
  placeHolder,
  type,
  name,
  error,
  className,
  fref,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block">
        {label}
      </label>
      <input
        name={name}
        ref={fref}
        type={type}
        placeholder={placeHolder}
        id={name}
        className={overrideTailwindClasses(
          `px-3 py-1.5 border-2 border-solid border-gray-400 rounded-md focus:outline-none w-full ${className}
          ${error ? "border-red-600" : ""}
          `
        )}
      />
      <p className="text-red-600 text-xs ml-1 mt-1 h-4">{error || " "}</p>
    </div>
  );
};

export default CustomInput;
