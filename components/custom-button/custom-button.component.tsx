import React from "react";
import Link from "next/link";

import { overrideTailwindClasses } from "tailwind-override";

interface CustomButtonBodyProps {
  className?: string;
  children: React.ReactNode;
  color?: string;
  bgColor?: string;
  transitionColor?: string;
  transitionBgColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

interface Props extends CustomButtonBodyProps {
  href?: string;
}

const CustomButtonBody: React.FC<CustomButtonBodyProps> = ({
  className,
  children,
  color,
  bgColor,
  transitionColor,
  transitionBgColor,
  borderColor,
  onClick,
}) => {
  return (
    <button
      // purgecss: bg-primary text-white border-primary hover:text-primary hover:bg-white
      className={overrideTailwindClasses(
        `bg-${bgColor || "primary"} rounded-lg text-${color || "white"} font-semibold px-4 py-1.5
        border-2 border-solid border-${borderColor || "primary"}
        transition-colors duration-300 ease-out focus:outline-none 
        hover:text-${transitionColor || "primary"} hover:bg-${transitionBgColor || "white"}
        ${className}`
      )}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
};

const CustomButton: React.FC<Props> = ({ href, ...props }) => {
  if (href) {
    return (
      <Link href={href}>
        <a>
          <CustomButtonBody {...props} />
        </a>
      </Link>
    );
  }

  return <CustomButtonBody {...props} />;
};

export default CustomButton;
