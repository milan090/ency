import React from "react";
import Image from "next/image";
import { BgPastelColors } from "src/types/styles.types";
import Styles from "./home-features.module.scss";

export const HomeFeatures: React.FC = () => {
  return (
    <>
      {/* Red Section */}
      <section className="w-full flex items-center">
        <div className="w-1/2 relative flex">
          <div className="absolute">
            <Image
              src="/images/home/section-2/red_bg.png"
              width={678}
              height={380}
              className="absolute"
            />
          </div>
          <div className="mx-auto mt-14">
            <Image src="/images/home/section-2/ai_summarise.png" width={450} height={425} />
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="w-7/12 mx-auto">
            <h2 className="font-semibold text-5xl leading-tighter mb-2">
              An AI that literally writes for you
            </h2>
            <p className="text-primary-600 leading-relaxed w-10/12">
              Been wanting a robot that writes your assignments? Well it’s right here! With tools
              like the Summariser and Paraphraser, Ency will read, write and re-write your papers
              for you.!
            </p>
          </div>
          <div className="ml-auto">
            <Image src="/images/home/section-2/arrow.png" width={250} height={70} />
          </div>
        </div>
      </section>

      {/* Yellow Section */}
      <section className="w-full flex items-center bg-primary-150 py-16 my-14 relative">
        <div className="w-1/2 flex flex-col">
          <div className="absolute top-10">
            <Image src="/images/home/section-3/arrow.png" width={250} height={140} />
          </div>
          <div className="w-7/12 mx-auto">
            <h2 className="font-semibold text-5xl leading-tighter mb-2">
              An Editor that’s crafted for you
            </h2>
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
        <div className="w-1/2 relative">
          <div className="absolute right-0">
            <Image src="/images/home/section-3/yellow_bg.png" width={678} height={380} />
          </div>
          <div className="absolute z-10 w-full flex justify-center items-center mt-44 pr-20">
            <Image src="/images/home/section-3/new_block.png" width={500} height={125} />
          </div>
          <div className="mx-auto mt-14 flex justify-center">
            <Image src="/images/home/section-3/editor.png" width={450} height={425} />
          </div>
        </div>
      </section>

      {/* Green Section */}
      <section className="w-full flex items-center">
        <div className="w-1/2 relative flex">
          <div className="absolute">
            <Image
              src="/images/home/section-4/green_bg.png"
              width={678}
              height={380}
              className="absolute"
            />
          </div>
          <div className="mx-auto">
            <Image src="/images/home/section-4/community.png" width={750} height={760} />
          </div>
        </div>
        <div className="w-1/2 flex flex-col relative">
          <div className="w-7/12 mx-auto">
            <h2 className="font-semibold text-5xl leading-tighter mb-2">
              And a community that loves you
            </h2>
            <p className="text-primary-600 leading-relaxed w-10/12">
              Running out of time? Start with templates or ready-made projects posted by the
              community. Also, don’t be shy to contribute to our community :P
            </p>
          </div>
          <div className="ml-auto mr-32">
            <Image src="/images/home/section-4/arrow.png" width={250} height={250} />
          </div>
        </div>
      </section>

      <section className="w-full bg-primary-150 min-h-screen flex items-center justify-center flex-col">
        <h2 className="font-semibold text-5xl text-center">
          Ency{"'"}s what you have been waiting for, <br /> right from your childhood
        </h2>

        {/* Cards */}
        <div className="mt-14 flex flex-col items-center space-y-9">
          {/* First Row */}
          <div className="flex items-center gap-x-9">
            {/* Card Robot */}
            <FeatureCard imageSrc="/images/home/icons/noto_robot.png" color="bg-pastel-yellow">
              <p>
                An AI-Powered <br /> Summariser
              </p>
            </FeatureCard>
            <FeatureCard
              imageSrc="/images/home/icons/noto_writing-hand.png"
              color="bg-pastel-lblue"
            >
              <p>
                All-in-on Block <br /> Editor
              </p>
            </FeatureCard>
            <FeatureCard
              imageSrc="/images/home/icons/noto_speech-balloon.png"
              color="bg-pastel-green"
            >
              <p>
                An AI-Powered <br /> Paraphraser
              </p>
            </FeatureCard>
          </div>

          {/* Second Row */}
          <div className="flex items-center justify-center gap-x-9">
            {/* Card Robot */}
            {/* purgecss: bg-pastel-violet */}
            <FeatureCard imageSrc="/images/home/icons/noto_rocket.png" color="bg-pastel-violet">
              <p>
                Powerful Grammer <br /> & Spell Checker
              </p>
            </FeatureCard>
            <FeatureCard imageSrc="/images/home/icons/noto_heart-suit.png" color="bg-pastel-red">
              <p>
                A Community to get Templates <br /> & Ready Made Projects from
              </p>
            </FeatureCard>
          </div>

          {/* Third row */}
          <div className="flex items-center justify-center gap-x-9">
            {/* Card Robot */}
            <FeatureCard imageSrc="/images/home/icons/bx_bxs-download.png" color="bg-pastel-dblue">
              <p>
                Export your work to <br /> multiple formats
              </p>
            </FeatureCard>
            <FeatureCard imageSrc="/images/home/icons/noto_bookmark.png" color="bg-pastel-green">
              <p>
                Easily Organise <br /> Projects using Tags
              </p>
            </FeatureCard>
            <FeatureCard
              imageSrc="/images/home/icons/noto_locked-with-key.png"
              color="bg-pastel-lblue"
            >
              <p>
                100% Secure and <br /> Private platform
              </p>
            </FeatureCard>
          </div>
        </div>
      </section>
    </>
  );
};

type FeatureCardProps = {
  imageSrc: string;
  color: BgPastelColors;
  children: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, color, children }) => {
  return (
    <div className={`shadow-md rounded-full p-3 pr-8 flex items-center ${Styles.featureCard}`}>
      <div className={`rounded-full p-4 mr-4 ${color} flex justify-center items-center`}>
        <Image src={imageSrc} width={45} height={45} />
      </div>
      <div className="px-3">{children}</div>
    </div>
  );
};
