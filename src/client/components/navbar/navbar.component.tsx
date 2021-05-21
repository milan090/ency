import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./navbar.styles.module.scss";

const NavLinks: { value: string; href: string }[] = [
  {
    value: "About Us",
    href: "/",
  },
  {
    value: "Updates",
    href: "/",
  },
  {
    value: "Join Our Discord",
    href: "/",
  },
];

export const Navbar: React.FC = () => {
  // const [session] = useSession();

  return (
    <nav className="flex justify-center items-center h-24 absolute w-full z-10">
      {/* Navbar Content Container */}
      <div className="w-11/12 flex items-center">
        <div>
          {/* Logo */}
          <Link href="/">
            <div>
              <Image src="/images/logo-wide.svg" alt="Ency logo" width={110} height={32} />
            </div>
          </Link>
        </div>

        {/* Middle Nav Links */}
        <ul className={`flex group hover:text-primary-500 ${styles.navLinks}`}>
          {NavLinks.map((props, i) => (
            <li key={i}>
              <NavLink {...props} />
            </li>
          ))}
          <li className="border-l border-primary-400">
            <NavLink href="/" value="Get Notified" />
          </li>
        </ul>
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
    <a className={`mx-4 text-base text-black hover:text-black ${styles.navLink}`}>{value}</a>
  </Link>
);
