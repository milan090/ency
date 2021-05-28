import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { handlePreLaunchEmailSubmit } from "src/client/services/api/handle-email.submit";
import toast from "react-hot-toast";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleNotifyMe = (): void => {
    if (!email) {
      toast.error("No email entered");
      return;
    }
    toast.promise(
      handlePreLaunchEmailSubmit(email),
      {
        loading: "Submitting...",
        success: <b>Success! We will notify you once we are out for beta!</b>,
        error: <b>Oops! Something went wrong</b>,
      },
      { duration: 5000 }
    );
  };

  return (
    <footer className="text-white grid grid-cols-3 grid-flow-row">
      <div className="bg-accent-lblue col-span-3 md:col-span-2 flex flex-col items-start px-8 md:px-24 py-28">
        <h2 className="text-4xl sm:text-5xl font-semibold">Wanna try out Ency first?</h2>
        <p className="w- mt-4">
          Enter your email to get notified when we’re open for beta-testing. <br /> We hate spams
          and promise to never post one in your inbox too!
        </p>

        {/* Input */}
        <div className="rounded-full bg-white flex justify-between h-14 sm:h-16 overflow-hidden mt-10 w-full text-sm sm:text-base">
          <input
            className="ml-7 min-w-0 text-black"
            type="text"
            placeholder="Enter your Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-500 border border-accent-lblue text-white rounded-l-full px-7 whitespace-nowrap"
            onClick={handleNotifyMe}
          >
            Get Notified
          </button>
        </div>
      </div>

      <div className="bg-blue-500 flex flex-col col-span-3 md:col-span-1">
        <div className="my-auto flex justify-between md:block gap-y-6 mx-10 sm:mx-24 md:mx-0 md:pl-20 py-10">
          <div className="flex flex-col gap-y-6 justify-between">
            <Link href="/">
              <a href="/">About Us</a>
            </Link>

            <Link href="/">
              <a href="/">Updates</a>
            </Link>
          </div>

          <div className="flex flex-col gap-y-6 gap-x-10 justify-between">
            <Link href="/">
              <a href="/">Privacy Policy</a>
            </Link>

            <Link href="/">
              <a href="/">Terms & Conditions</a>
            </Link>
          </div>
        </div>
        <div className="bg-blue-600 flex py-5">
          <div className=" flex gap-x-6 mx-auto md:mx-0 md:ml-20">
            <Image src="/images/other/twitter.svg" width={25} height={25} />
            <Image src="/images/other/instagram.svg" width={25} height={25} />
            <Image src="/images/other/discord.svg" width={25} height={25} />
          </div>
        </div>
      </div>
    </footer>
  );
};
