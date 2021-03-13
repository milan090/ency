import React, { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

type Props = {
  name: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  label: string;
  error?: string;
  fref?: any;
};

export const FormInput: React.FC<Props> = ({
  fref,
  type = "text",
  placeholder = "",
  name,
  label,
  error = "",
}) => {
  return (
    <>
      <label htmlFor={"form" + name} className="text-sm ml-0.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={"form" + name}
        autoComplete="on"
        placeholder={placeholder}
        ref={fref}
        className="w-full border-2 border-gray-300 bg-white px-4 py-2 rounded-base outline-none"
      />
      <p className="text-xs text-red-400 ml-0.5 mb-4">{error}</p>
    </>
  );
};

export const FormPasswordInput: React.FC<Props> = ({
  fref,
  placeholder = "",
  name,
  label,
  error = "",
}) => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const inputDivRef = useRef<any>();

  const handleClick = (): void => {
    setInputType((currentInputType) => (currentInputType === "password" ? "text" : "password"));
  };

  useEffect(() => {
    inputDivRef.current.querySelector("input").type = inputType;
  }, [inputType]);

  return (
    <>
      <label htmlFor={"form" + name} className="text-sm ml-0.5">
        {label}
      </label>
      <div
        className="w-full border-2 border-gray-300 bg-white px-4 py-2 rounded-base flex items-center justify-between"
        ref={inputDivRef}
      >
        <input
          type={inputType}
          name={name}
          id={"form" + name}
          autoComplete="on"
          placeholder={placeholder}
          ref={fref}
          className="w-10/12 outline-none"
        />
        <button
          className="float-right outline-none focus:outline-none"
          type="button"
          onSubmit={(e) => e.preventDefault()}
          onClick={handleClick}
        >
          {inputType === "password" ? (
            <Eye className="stroke-gray-500" size="20" />
          ) : (
            <EyeOff className="stroke-gray-500" size="20" />
          )}
        </button>
      </div>
      <p className="text-xs text-red-400 ml-0.5 mb-4">{error}</p>
    </>
  );
};
