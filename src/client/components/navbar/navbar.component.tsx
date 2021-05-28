import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./navbar.styles.module.scss";
import { Instagram, Menu, Twitter, X } from "react-feather";
import classNames from "classnames";

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
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="flex lg:absolute bg-primary-150 w-full z-10">
      <div className="flex justify-between items-center h-24 w-full mx-8 md:mx-14">
        {/* Navbar Content Container */}
        <div className="flex items-center">
          <div>
            {/* Logo */}
            <Link href="/">
              <div>
                <Image src="/images/logo-wide.svg" alt="Ency logo" width={110} height={32} />
              </div>
            </Link>
          </div>

          {/* Middle Nav Links */}
          <ul className={`hidden md:flex group mb-0.5 hover:text-primary-500 ${styles.navLinks}`}>
            {NavLinks.map((props, i) => (
              <li key={i} className="px-4">
                <NavLink {...props} />
              </li>
            ))}
            <li className="border-l border-primary-400 px-4">
              <NavLink href="/" value="Get Notified" />
            </li>
          </ul>
        </div>

        <button
          className="md:hidden"
          aria-label="Menu Expand Button"
          onClick={() => setIsNavOpen(true)}
        >
          <Menu />
        </button>
      </div>
      <div
        className={classNames(
          !isNavOpen && "hidden",
          "bg-black bg-opacity-40 md:hidden fixed z-50 w-full flex"
        )}
      >
        <div className="bg-white right-0 w-3/4 min-h-screen ml-auto flex flex-col">
          <div className="flex flex-col pr-6 pt-9">
            <button className="ml-auto mb-10" onClick={() => setIsNavOpen(false)}>
              <X />
            </button>
            <ul className="ml-auto text-right leading-14 font-medium">
              {NavLinks.map((props, i) => (
                <li key={i}>
                  <NavLink {...props} />
                </li>
              ))}
              <li className="border-t-2 border-primary-300">
                <Link href="/">
                  <a className="text-base text-accent-lblue" href="/">
                    Get Notified
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="h-24 mt-auto py-6 bg-gray-200 flex flex-col">
            <div className="flex justify-around text-sm text-primary-400 mx-6">
              <Link href="/">
                <a href="/">Privacy Policy</a>
              </Link>
              <Link href="/">
                <a href="/">Terms & Conditions</a>
              </Link>
            </div>
            <div className="flex gap-x-6 mx-auto mt-3">
              <Twitter className="fill-current text-accent-lblue" />
              <Instagram className="stroke-accent-lblue" />
            </div>
          </div>
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
    <a className={`text-base text-black hover:text-black ${styles.navLink}`}>{value}</a>
  </Link>
);
