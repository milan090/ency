import React from "react";
import Link from "next/link";

import NavLink from "./nav-link.component";
import CustomButton from "../custom-button/custom-button.component";


type Props = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div className="w-full flex justify-center items-center mt-6 mb-4">
      <div className="flex flex-row max-w-8xl w-full justify-between mx-5">
        <div className="flex flex-row items-center">
          <Link href="/">
            <a className="mr-3 flex flex-row items-center">
              <span className="mr-5"><img src="./brandLogo.svg" alt=""/></span>
              <span className="text-4xl font-bold">Ency</span>
            </a>
          </Link>
          <NavLink isActive={true} href="/">Home</NavLink>
          <NavLink isActive={false} href="/">Features</NavLink>
        </div>
        <div className="flex flex-row items-center">
          <CustomButton href="/signin" className="bg-accent text-primary hover:text-black">Sign-in</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
