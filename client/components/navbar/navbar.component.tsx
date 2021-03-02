import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlueBorderWhiteBGButton } from "components/CustomButtons/whitebg-button.component";

const NavLinks: { value: string; href: string }[] = [
  {
    value: "Home",
    href: "/",
  },
  {
    value: "Menu1",
    href: "/",
  },
  {
    value: "Menu2",
    href: "/",
  },
  {
    value: "Menu3",
    href: "/",
  },
];

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-center items-center h-20">
      <div className="w-11/12 flex justify-between items-center">
        <div>
          {/* Logo */}
          <Link href="/">
            <div>
              <Image src="/images/logo.svg" alt="Ency logo" width={110} height={32} />
            </div>
          </Link>
        </div>

        {/* Middle Nav Links */}
        <ul className="flex">
          {NavLinks.map((props, i) => (
            <li key={i}>
              <NavLink {...props} />
            </li>
          ))}
        </ul>

        <div>
          <NavLink value="Log In" href="/login" />
          <Link href="/sign-up">
            <a>
              <BlueBorderWhiteBGButton>Sign Up</BlueBorderWhiteBGButton>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

type NavLinkProps = {
  value: string;
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ value, href }) => (
  <Link href={href}>
    <a className="mx-4">{value}</a>
  </Link>
);
