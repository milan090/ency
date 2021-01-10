import Head from "next/head";
import CustomButton from "../components/custom-button/custom-button.component";

import Navbar from "../components/navbar/navbar.component";

import { PlayCircle } from "react-feather";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ency | Your Personal Research Assisstant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ backgroundImage: "url('./home/landing-page.svg')" }} className="bg-no-repeat h-screen bg-cover bg-center">
        <Navbar isLoggedIn={false} />
        <div className="w-full flex justify-center mt-20">
          <section className="max-w-6xl w-full mx-10">
            <h1 className="text-6xl font-bold leading-tight">
              The <br /> Virtual <br /> Assistant <br /> You Need.
            </h1>
            <p className="text-gray-500 ml-2">
              Summarise, Narrate, Personalise <br /> Get things done with Ency
            </p>

            <div className="mt-12 ml-2 flex flex-row items-center">
              {/* Get Started Button */}
              <span className="mr-4">
                <CustomButton>Get Started</CustomButton>
              </span>

              {/* How It Works */}
              <span className="flex flex-row cursor-pointer">
                <span className="mr-1">
                  <PlayCircle className="stroke-primary" />
                </span>
                <span className="text-primary font-semibold">How It Works</span>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
