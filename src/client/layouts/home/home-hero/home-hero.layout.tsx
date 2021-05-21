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
    <section className="flex items-center min-h-screen mb-40 relative">
      <div className="max-w-xl">
        <div className="ml-24">
          <h1 className="font-extrabold text-6xl mb-5 text-primary-600 leading-tighter">
            Get your Paper <br /> Done Without <br />{" "}
            <span className="text-accent-lblue">the Pain!</span>
          </h1>
          <p className="text-primary-600 w-96 leading-7 mb-5">
            With Ency’s AI-powered tools and our lovely community, you can get your assignments,
            reports, and articles done faster & easier.
          </p>

          {/* Input */}
          <div className="rounded-full border border-accent-lblue flex justify-between h-16 overflow-hidden">
            <input
              className="ml-7"
              type="text"
              placeholder="Enter your Email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-accent-lblue border border-accent-lblue text-white rounded-l-full px-7"
              onClick={() => handleNotifyMe()}
            >
              Get Notified
            </button>
          </div>
        </div>

        <div className="absolute">
          <Image src="/images/home/arrow.png" width={233} height={155} />
        </div>
      </div>
      <div className="ml-auto pr-14 mt-10 relative">
        <Image width={675} height={675} src="/images/home/section-1/circle.png" />

        {/* Hands */}
        <div className="absolute top-0 right-0 z-20">
          <Image width={400} height={500} src="/images/home/section-1/hand-1.png" />
        </div>
        <div className="absolute -bottom-40 right-0 z-10">
          <Image width={531} height={464} src="/images/home/section-1/hand-2.png" />
        </div>
      </div>
    </section>
  );
};
