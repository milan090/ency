import React from "react";
import Link from "next/link";

type Props = {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink: React.FC<Props> = ({ isActive, href, children, className }) => {
  return (
    <span className="mx-8">
      <Link href={href || "/"}>
        <a
          className={`font-bold text-base hover:text-black transition-colors duration-200 ease-in-out ${
            isActive ? "text-black border-solid border-b-4 border-primary" : "text-gray-500"
          }
           ${className}`}
        >
          {children}
        </a>
      </Link>
    </span>
  );
};

export default NavLink;
