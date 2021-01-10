import React from "react";
import Link from "next/link";

import NavLink from "./nav-link.component";
import CustomButton from "../custom-button/custom-button.component";

type Props = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <nav className="w-full flex justify-center items-center pt-6 pb-4 box-border">
      <div className="flex flex-row max-w-8xl w-full justify-between mx-5">
        <div className="flex flex-row items-center">
          <Link href="/">
            <a className="mr-5 flex flex-row items-center">
              <span className="mr-5">
                <img src="./brand-logo.svg" alt="logo ency" />
              </span>
              <span className="text-4xl font-bold">Ency</span>
            </a>
          </Link>
          <NavLink isActive={true} href="/">
            Home
          </NavLink>
          <NavLink isActive={false} href="/">
            Features
          </NavLink>
        </div>
        <div className="flex flex-row items-center">
          <CustomButton
            href={isLoggedIn ? "/dashboard" : "/signin"}
            className="bg-accent text-black hover:text-primary"
          >
            {isLoggedIn ? "Go To Dashboard" : "Sign-in"}
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
