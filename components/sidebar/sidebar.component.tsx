import React from "react";
import Link from "next/link"
import { Home, Book, Clipboard } from "react-feather"

const SideBar: React.FC = () => {
    return (
        <div className="fixed left-0 h-screen w-20 px-2 py-2 bg-white shadow-lg">
            <Link href="#"><img src="/brand-logo.svg" width="70" /></Link>
            <div className="flex-col py-10 space-y-10">
                <Link href="#">
                    <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto pt-2">
                        <Home size="30" className="mx-auto" />
                    </div>
                </Link>
                <Link href="#">
                    <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto pt-2">
                        <Book size="30" className="mx-auto" />
                    </div>
                </Link>
                <Link href="#">
                    <div className="transition-all duration-300 ease-in-out cursor-pointer rounded-full hover:shadow-xl w-12 h-12 mx-auto pt-2">
                        <Clipboard size="30" className="mx-auto" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SideBar;