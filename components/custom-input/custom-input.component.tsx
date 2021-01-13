import React, { useState } from "react";

import { overrideTailwindClasses } from "tailwind-override";

type Props = {
  label: string;
  placeHolder: string;
  type: "text" | "password" | "email";
  name: string;
  error?: string;
  className?: string;
  onChange?: (value: string) => void;
  formValidate?: (value: string) => string | void | null;
};

const CustomInput: React.FC<Props> = ({
  label,
  placeHolder,
  type,
  name,
  error,
  className,
  onChange,
  formValidate,
}) => {
  const [validationError, setValidationError] = useState("");

  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        id={name}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
            if (formValidate) {
              const newError: string = formValidate(e.target.value) || "";
              setValidationError(newError);
            }
          }
        }}
        className={overrideTailwindClasses(
          `px-3 py-1.5 border-2 border-solid border-gray-400 rounded-md focus:outline-none w-full ${className}
          ${error || validationError ? "border-red-600" : ""}
          `
        )}
      />
      <p className="text-red-600 text-xs ml-1 mt-1 h-4">{error || validationError || " "}</p>
    </div>
  );
};

export default CustomInput;
