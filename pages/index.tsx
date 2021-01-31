/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Link from "next/link";
import CustomButton from "../components/custom-button/custom-button.component";
import Navbar from "../components/navbar/navbar.component";
import { PlayCircle } from "react-feather";
import { useAuth } from "hooks/useAuth.provider";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>Ency | Your Personal Research Assisstant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div
          style={{ backgroundImage: "url('./home/landing-page-bg-3.svg')" }}
          className="bg-no-repeat bg-cover"
        >
          <div>
            <Navbar isLoggedIn={false} />
            <div className="w-full flex flex-col justify-center items-center mt-20">
              <section className="xl:max-w-6xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl xs:max-w-lg w-full mx-10 h-screen">
                <h1 className="text-6xl font-bold" style={{ lineHeight: "1.12" }}>
                  The <br /> Virtual <br /> Assistant <br /> You Need.
                </h1>
                <p className="text-gray-500 ml-2">
                  Summarise, Narrate, Personalise <br /> Get things done with Ency
                </p>

                <div className="mt-10 ml-2 flex flex-row items-center">
                  {/* Get Started Button */}
                  <span className="mr-4">
                    <Link href={user.uid ? "/dashboard" : "/sign-in"}>
                      <CustomButton>Get Started</CustomButton>
                    </Link>
                  </span>

                  {/* How It Works */}
                  <span className="flex flex-row cursor-pointer">
                    <span className="mr-1">
                      <PlayCircle className="stroke-primary" />
                    </span>
                    <span className="text-primary font-semibold">
                      <a href="https://youtu.be/kmLkdqIRy9o" target="_blank" rel="noreferrer">
                        How It Works
                      </a>
                    </span>
                  </span>
                </div>
              </section>
              <div
                className="h-screen xl:max-w-6xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl xs:max-w-lg w-full mx-10 pb-10 my-20 lg:my-0"
                id="features"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between h-full">
                  <div className="max-w-sm">
                    <h1 className="font-bold text-4xl text-white leading-tight">
                      Make Your Projects <br /> <span className="text-accent">Well-Managed</span>
                    </h1>
                    <p className="text-white mt-5">
                      Organize your research projects and tasks efficiently. Spent less time
                      thinking what to do, and where to find stuff.{" "}
                    </p>
                  </div>
                  <div className="rounded-full bg-accent h-96 w-96 relative">
                    <img
                      src="./home/content-blocks.svg"
                      alt="Content Blocks"
                      className="absolute max-w-lg right-10 -top-5"
                    />
                  </div>
                </div>
              </div>

              <div className="h-screen xl:max-w-6xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl xs:max-w-lg w-full mx-10 pb-10 my-20 lg:my-0">
                <div className="flex flex-col-reverse lg:flex-row  items-center justify-between h-full">
                  <div className="rounded-full bg-accent h-96 w-96 relative">
                    <img
                      src="./home/url-summary.png"
                      alt="Content Blocks"
                      className="absolute max-w-lg -top-5"
                    />
                  </div>
                  <div className="max-w-sm">
                    <h1 className="font-bold text-4xl text-white leading-tight">
                      Summarize Text Or <br /> Web Articles With
                      <br /> <span className="text-accent">Just A Click</span>
                    </h1>
                    <p className="text-white mt-5">
                      With our powerful custom build Natural language processors, almost anything
                      can be summarized in to short sentences. <br />
                      <br /> Who said assigments can't at midnight?
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-screen xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl xs:max-w-lg w-full mx-10 pb-10 my-20 lg:my-0">
                <div className="flex flex-col lg:flex-row  items-center justify-between h-full">
                  <div className="max-w-sm">
                    <h1 className="font-bold text-4xl text-white leading-tight">
                      Confused Where To Start? <br />{" "}
                      <span className="text-accent">Not Anymore</span>
                    </h1>
                    <p className="text-white mt-5">
                      You just type in the name of your project, and Ency will provide you with AI
                      Generated Content Template for you to continue working on.
                      <br /> <br /> Ency will also provide you with some awesome articles you can
                      refer into
                    </p>
                  </div>
                  <div className="rounded-full bg-accent h-96 w-96 relative">
                    <img
                      src="./home/ai-tips.png"
                      alt="Content Blocks"
                      className="absolute max-w-lg right- -top-5"
                    />
                  </div>
                </div>
              </div>

              <div className="h-screen xl:max-w-6xl lg:max-w-5xl md:max-w-2xl sm:max-w-xl xs:max-w-lg w-full mx-10 pb-10 my-20">
                <div className="flex flex-col-reverse lg:flex-row  items-center justify-between h-full">
                  <div className="rounded-full bg-accent h-96 w-96 relative">
                    <img
                      src="./home/blocks-editor.png"
                      alt="Content Blocks"
                      className="absolute max-w-lg -top-5"
                    />
                  </div>
                  <div className="max-w-md">
                    <h1 className="font-bold text-4xl text-white leading-tight">
                      No Wait, It's Not Just A Text Editor, We Give You The{" "}
                      <span className="text-accent">Block Editor!</span>
                    </h1>
                    <p className="text-white mt-5">
                      Typing Text In A Normal Text Editor Is Plain Boring. So We Made This Intuitive
                      Block Editor, Just To Make Your Research Bit More Enjoyable
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundImage: "url('./home/free-bg.svg')" }}
          className="bg-no-repeat bg-cover"
        >
          <div className="h-screen flex flex-col lg:flex-row  justify-center items-center">
            <div className="max-w-6xl">
              <div className="text-center">
                <h2 className="font-bold text-5xl">And It's 100% Free</h2>
                <p className="text-gray-500 mt-2">So what are you waiting for? Get Started Now!</p>
              </div>
              <div className="mt-10 flex justify-center items-center">
                {/* Get Started Button */}
                <span className="mr-4">
                  <Link href={user.uid ? "/dashboard" : "/sign-in"}>
                    <CustomButton>Get Started</CustomButton>
                  </Link>
                </span>

                {/* How It Works */}
                <span className="flex flex-row cursor-pointer">
                  <span className="mr-1">
                    <PlayCircle className="stroke-primary" />
                  </span>
                  <span className="text-primary font-semibold">
                    <a href="https://youtu.be/kmLkdqIRy9o" target="_blank" rel="noreferrer">
                      How It Works
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
