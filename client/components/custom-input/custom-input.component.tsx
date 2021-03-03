import React from "react";

import { overrideTailwindClasses } from "tailwind-override";

// Labels should be larger than placeholder
// If label is sm, placeholder should be xs
const placeholderTextSize = {
  xs: "xs",
  sm: "xs",
  base: "sm",
  lg: "base",
  xl: "lg",
  "2xl": "xl",
};

type Props = {
  label?: string;
  placeHolder: string;
  type: "text" | "password" | "email";
  name: string;
  error?: string | undefined;
  className?: string;
  fref?: any;
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  [prop: string]: any;
};

const CustomInput: React.FC<Props> = ({
  label,
  placeHolder,
  type,
  name,
  error,
  className,
  fref,
  textSize,
  ...props
}) => {
  return (
    <div className="mb-4">
      {/* purge-css: text-xs text-sm text-lg text-base text-xl text-2xl */}
      <label htmlFor={name} className={`mb-1 block font-normal text-${textSize || "xl"}`}>
        {label}
      </label>
      <input
        {...props}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        name={name}
        ref={fref}
        type={type}
        placeholder={placeHolder}
        id={name}
        className={overrideTailwindClasses(
          `px-3 py-1.5 border-2 border-solid border-gray-400 rounded-md focus:outline-none text-${
            textSize ? placeholderTextSize[textSize] : "base"
          } w-full ${className}
          ${error ? "border-red-600" : ""}
          `
        )}
      />

      <p className="text-red-600 text-sm ml-1 mt-1 h-1">{error || " "}</p>
    </div>
  );
};

export default CustomInput;
