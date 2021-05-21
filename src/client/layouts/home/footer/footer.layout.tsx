import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="text-white grid grid-cols-3">
      <div className="bg-accent-lblue col-span-2 flex flex-col items-start px-24 py-28">
        <h2 className="text-5xl font-semibold">Wanna try out Ency first?</h2>
        <p className="w-2/3 mt-4">
          Enter your email to get notified when we’re open for beta-testing. <br /> We hate spams
          and promise to never post one in your inbox too!
        </p>

        {/* Input */}
        <div className="rounded-full bg-white flex justify-between h-16 overflow-hidden mt-10">
          <input className="ml-7" type="text" placeholder="Enter your Email" autoComplete="email" />
          <button className="bg-blue-500 border border-accent-lblue text-white rounded-l-full px-7">
            Get Notified
          </button>
        </div>
      </div>
      <div className="bg-blue-500 flex flex-col">
        <ul className="my-auto flex flex-col gap-y-6 pl-20">
          <li>
            <Link href="/">
              <a href="/">About Us</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="/">Updates</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="/">Privacy Policy</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a href="/">Terms & Conditions</a>
            </Link>
          </li>
        </ul>
        <div className="bg-blue-600 pl-20 py-5 flex gap-x-6">
          <Image src="/images/other/twitter.svg" width={25} height={25} />
          <Image src="/images/other/instagram.svg" width={25} height={25} />
          <Image src="/images/other/discord.svg" width={25} height={25} />
        </div>
      </div>
    </footer>
  );
};
