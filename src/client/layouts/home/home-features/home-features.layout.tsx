import React from "react";
import Image from "next/image";
import { BgPastelColors } from "src/types/styles.types";
import Styles from "./home-features.module.scss";

export const HomeFeatures: React.FC = () => {
  return (
    <>
      {/* Red Section */}
      <section className="w-full flex-col-reverse md:flex-row flex items-center">
        <div className="md:w-1/2 relative flex">
          <div className="absolute">
            <Image
              src="/images/home/section-2/red.svg"
              width={678}
              height={479}
              className="absolute"
              alt=""
            />
          </div>
          <div className="mx-10 md:mx-auto mt-14">
            <Image
              src="/images/home/section-2/encySummariser.svg"
              width={678}
              height={501}
              alt=""
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col pb-20 relative">
          <div className="md:w-9/12 lg:w-7/12 mx-14 md:mx-auto">
            <Title>An AI that literally writes for you</Title>
            <p className="text-primary-600 leading-relaxed md:w-10/12">
              Been wanting a robot that writes your assignments? Well it’s right here! With tools
              like the Summarizer and Paraphraser, Ency will read, write and re-write your papers
              for you!
            </p>
          </div>
          <div className="ml-auto hidden md:block absolute right-0 -bottom-10">
            <Image src="/images/home/section-2/arrow.svg" width={273} height={275} alt="" />
          </div>
        </div>
      </section>

      {/* Yellow Section */}
      <section className="w-full md:flex items-center bg-primary-150 py-16 my-14 relative">
        <div className="md:w-1/2 flex">
          <div className="absolute top-10 hidden md:block">
            <Image src="/images/home/section-3/arrow.svg" width={250} height={140} alt="" />
          </div>
          <div className="md:w-9/12 lg:w-7/12 mx-14 md:mx-auto">
            <Title>An Editor that’s crafted for you</Title>
            <p className="text-primary-600 leading-relaxed w-10/12">
              Our cutting edge block editor makes it easier to write that paper or article of yours,
              and export it to mulitple formats. Also did we forget that you can bring in your
              friends to help you too?
            </p>
          </div>
          {/* <div className="mr-auto"> 
            <Image src="/images/home/section-2/arrow.png" width={250} height={70} />
          </div> */}
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute right-0">
            <Image src="/images/home/section-3/yellow.svg" width={708} height={486} alt="" />
          </div>
          <div>
            <div className="absolute z-10 w-full">
              <Image src="/images/home/section-3/extraBlock.svg" width={700} height={475} alt="" />
            </div>
            <div className="mx-auto mt-14 flex justify-center">
              <Image src="/images/home/section-3/editor.svg" width={708} height={508} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Green Section */}
      <section className="w-full flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 relative flex">
          <div className="absolute">
            <Image
              src="/images/home/section-4/green.svg"
              width={682}
              height={579}
              className="absolute"
              alt=""
            />
          </div>
          <div className="mx-auto">
            <Image src="/images/home/section-4/social.svg" width={748} height={765} />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col relative pb-14">
          <div className="md:w-9/12 lg:w-7/12 mx-14 md:mx-auto">
            <Title>And a community that loves you</Title>

            <p className="text-primary-600 leading-relaxed w-10/12">
              Running out of time? Start with templates or ready-made projects posted by the
              community. Also, don’t be shy to contribute to our community :P
            </p>
          </div>
          <div className="ml-auto mr-32 hidden lg:block">
            <Image src="/images/home/section-4/arrow.svg" width={250} height={250} alt="" />
          </div>
        </div>
      </section>

      <section className="w-full bg-primary-150 min-h-screen flex items-center justify-center flex-col pt-14 pb-20">
        <h2 className="mx-6 text-3xl md:text-5xl max-w-3xl font-semibold text-center leading-snug md:leading-snug">
          Ency{"'"}s what you been waiting for, right from your childhood
        </h2>

        {/* Cards */}

        {/* First Row */}
        <div className="flex items-center flex-wrap gap-x-9 gap-y-9 justify-center mt-8 sm:mt-14 lg:max-w-6xl">
          {/* Card Robot */}
          <FeatureCard
            imageSrc="/images/home/icons/noto_robot.png"
            color="bg-pastel-yellow"
            className="sm:w-72"
          >
            <p>An AI-Powered Summarizer</p>
          </FeatureCard>
          <FeatureCard
            imageSrc="/images/home/icons/noto_writing-hand.png"
            color="bg-pastel-lblue"
            className="sm:w-72"
          >
            <p>All-in-on Block Editor</p>
          </FeatureCard>
          <FeatureCard
            imageSrc="/images/home/icons/noto_speech-balloon.png"
            color="bg-pastel-green"
            className="sm:w-72"
          >
            <p>An AI-Powered Paraphraser</p>
          </FeatureCard>

          {/* Card Robot */}
          {/* purgecss: bg-pastel-violet */}
          <FeatureCard
            imageSrc="/images/home/icons/noto_rocket.png"
            color="bg-pastel-violet"
            className="sm:w-92"
          >
            <p>Powerful Grammar & Spell Checker</p>
          </FeatureCard>
          <FeatureCard
            imageSrc="/images/home/icons/noto_heart-suit.png"
            color="bg-pastel-red"
            className="sm:w-96"
          >
            <p>A Community to get Templates & Ready Made Projects from</p>
          </FeatureCard>

          {/* Card Robot */}
          <FeatureCard
            imageSrc="/images/home/icons/bx_bxs-download.png"
            color="bg-pastel-dblue"
            className="sm:w-80"
          >
            <p>Export your work to multiple formats</p>
          </FeatureCard>
          <FeatureCard
            imageSrc="/images/home/icons/noto_bookmark.png"
            color="bg-pastel-green"
            className="sm:w-80"
          >
            <p>Easily Organise Projects using Tags</p>
          </FeatureCard>
          <FeatureCard
            imageSrc="/images/home/icons/noto_locked-with-key.png"
            color="bg-pastel-lblue"
            className="sm:w-80"
          >
            <p>100% Secure and Private platform</p>
          </FeatureCard>
        </div>
      </section>
    </>
  );
};

type FeatureCardProps = {
  imageSrc: string;
  color: BgPastelColors;
  children: React.ReactNode;
  className: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, color, children, className }) => {
  return (
    <div
      className={`shadow-md rounded-full p-3 pr-8 w-full mx-10 sm:m-0 flex items-center ${Styles.featureCard} ${className}`}
    >
      <div
        className={`rounded-full w-16 sm:w-max p-4 mr-4 ${color} flex justify-center items-center`}
      >
        <Image src={imageSrc} width={45} height={45} alt="" />
      </div>
      <div className="px-3">{children}</div>
    </div>
  );
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="font-semibold text-4xl md:text-4.5xl lg:text-5xl leading-tighter mb-2">
    {children}
  </h2>
);
