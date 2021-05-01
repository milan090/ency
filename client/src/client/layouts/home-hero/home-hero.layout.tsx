import { BlueBGButtonLg } from "src/client/components/CustomButtons/bluebg-button.component";
import { BlueBorderWhiteBGButtonLg } from "src/client/components/CustomButtons/whitebg-button.component";
import React from "react";
import { Play } from "react-feather";

export const HomeHeroLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <section className="max-w-2xl mt-20 mx-5">
        <h1 className="font-extrabold text-4xl text-center mb-5 text-gray-700">
          Traditional Writing is good. <br /> But it could be better 👍
        </h1>
        <p className="text-center mb-8">
          Presenting to you Ency, an AI Assisstant that helps you complete your reports, assignments
          and articles much faster & easier. There’s no turning back now!
        </p>
        <div className="flex justify-center items-center md:flex-row flex-col">
          <div className="md:mr-10 md:mb-0 mb-5">
            <BlueBGButtonLg>Get Started For Free</BlueBGButtonLg>
          </div>
          <BlueBorderWhiteBGButtonLg>
            <Play className="inline-block mr-2" size="16px" />
            <span>How it works</span>
          </BlueBorderWhiteBGButtonLg>
        </div>
      </section>
    </div>
  );
};
