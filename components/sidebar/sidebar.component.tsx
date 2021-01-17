import React from "react";
import Link from "next/link";
import { Home, Book, Clipboard, LogOut } from "react-feather";
import { useAuth } from "hooks/useAuth.provider";

const SideBar: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div className="fixed left-0 h-screen w-20 px-2 py-2 bg-white shadow-lg">
      <Link href="#">
        <img src="/brand-logo.svg" width="70" alt="" />
      </Link>
      <div className="flex flex-col h-full pb-20 pt-10 justify-between">
        <div className="flex flex-col space-y-10">
          <Link href="#">
            <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto">
              <Home size="30" className="mx-auto" />
            </div>
          </Link>
          <Link href="#">
            <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto">
              <Book size="30" className="mx-auto" />
            </div>
          </Link>
          <Link href="#">
            <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto">
              <Clipboard size="30" className="mx-auto" />
            </div>
          </Link>
        </div>
        <div className="flex flex-col space-y-10">
          <button
            className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto"
            onClick={signOut}
          >
            <LogOut size="30" className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
