import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { handlePreLaunchEmailSubmit } from "src/client/services/api/handle-email.submit";

export const HomeHeroLayout: React.FC = () => {
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
    <section className="lg:flex lg:items-center min-h-screen pt-5 lg:pt-0 mb-40 relative bg-primary-150">
      <div className="max-w-xl">
        <div className="mx-6 md:ml-24 flex flex-col items-center">
          <div className="ml-2">
            <h1 className="font-extrabold text-4xl xs:text-4.5xl md:text-6xl mb-5 text-primary-600 leading-tighter">
              Get your Paper <br /> Done Without <br />{" "}
              <span className="text-accent-lblue">the Pain!</span>
            </h1>
            <p className="text-primary-600 text-sm sm:text-base leading-6 sm:leading-7 mb-5">
              With Ency’s AI-powered tools and our lovely community, you can get your assignments,
              reports, and articles done faster & easier.
            </p>
          </div>

          {/* Input */}
          <div className="rounded-full shadow-sm border-2 flex justify-between h-14 sm:h-16 overflow-x-hidden w-full text-sm sm:text-base">
            <input
              className="ml-7 min-w-0"
              type="text"
              placeholder="Enter your Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-accent-lblue text-white rounded-l-full px-7 whitespace-nowrap font-bold"
              onClick={() => handleNotifyMe()}
            >
              Join Beta List
            </button>
          </div>
        </div>

        <div className="absolute hidden lg:block">
          <Image src="/images/home/section-1/arrow.svg" width={233} height={155} alt="" />
        </div>
      </div>
      <div className="ml-10 sm:ml-auto sm:max-w-xl flex mt-10 relative">
        <div className="ml-auto">
          <Image width={752} height={817} src="/images/home/section-1/circle.svg" alt="" />
        </div>

        {/* Hands */}
        <div className="absolute top-0 right-0 z-20">
          <Image width={752} height={830} src="/images/home/section-1/blueHand.svg" alt="" />
        </div>
        <div className="absolute top-0 right-0 z-10">
          <Image width={752} height={1010} src="/images/home/section-1/redHand.svg" alt="" />
        </div>
      </div>
    </section>
  );
};
