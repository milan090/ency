import React from "react";
import Link from "next/link";

import { overrideTailwindClasses } from "tailwind-override";

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
};

type CustomButtonBodyProps = {
  className?: string;
  children: React.ReactNode;
};

const CustomButtonBody: React.FC<CustomButtonBodyProps> = ({
  className,
  children,
}) => {
  return (
    <button
      className={overrideTailwindClasses(
        `bg-primary rounded-lg text-white font-semibold px-4 py-1.5
        transition-colors duration-300 ease-out focus:outline-none ${className}`
      )}
    >
      <span>{children}</span>
    </button>
  );
};

const CustomButton: React.FC<Props> = ({ className, children, href }) => {
  if (href) {
    return (
      <Link href={href}>
        <CustomButtonBody children={children} className={className} />
      </Link>
    );
  }

  return <CustomButtonBody children={children} className={className} />;
};

export default CustomButton;
