import { RangeSlider } from "src/client/components/range-slider/range-slider.component";
import { useCreateProject } from "src/client/hooks/create-project.hook";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { URL_REGEX } from "src/utils/validation.utils";
import { axios } from "src/config/client-axios";
import {
  CreateProjectMutationVariables,
  CreateProjectDocument,
  CreateProjectMutation,
} from "./createProject.generated";
import { useRouter } from "next/dist/client/router";
import { randomColor } from "src/utils/string-to-hex-color";
import { useMutation } from "urql";

export const StartWithEncy: React.FC = () => {
  const { step, reset } = useCreateProject();

  useEffect(() => {
    reset();
  }, [reset]);

  switch (step) {
    case "ONE":
      return <StepOne />;

    case "TWO":
      return <StepTwo />;
    case "THREE":
      return <StepThree />;
    default:
      return <div>Error</div>;
  }
};

interface StepOneForm {
  url?: string;
  title?: string;
}

const StepOne: React.FC = () => {
  const { register, handleSubmit, errors, setError } = useForm<StepOneForm>();
  const { setTitle, setUrl, setStep } = useCreateProject();

  const handleURLSubmit = handleSubmit(({ url }) => {
    if (!url) {
      setError("url", { message: "Field should not be empty" });
    } else {
      console.log("URL", url);
      setUrl(url as string);
      setStep("TWO");
    }
  });

  const handleTitleSubmit = handleSubmit(({ title }) => {
    if (!title) {
      setError("title", { message: "Field should not be empty" });
    } else {
      console.log("TITLE", title);
      setTitle(title as string);
      setStep("TWO");
    }
  });

  return (
    <div className="flex flex-col">
      <div className="max-w-sm flex flex-col">
        <img
          src="/images/create-project/start-with-ency-modal.svg"
          alt="Start with ency illustration"
          className="mb-4"
        />
        <p className="font-light text-sm">
          Have an article you found out for your project, but lazy to summarize it? Well Ency is
          here to help you
        </p>
        <div className="mt-3 w-full flex">
          <input
            type="text"
            placeholder="Enter URL of article"
            name="url"
            ref={register({
              pattern: {
                value: URL_REGEX,
                message: "Invalid URL",
              },
            })}
            className="text-sm pl-4 py-2 border rounded-l-full border-gray-400 flex-auto transition-colors duration-300 hover:border-gray-500"
          />
          <button
            className="bg-blue-400 text-white px-5 rounded-r-full hover:bg-blue-500 transition-colors duration-300 border border-blue-400 text-sm"
            onClick={handleURLSubmit}
          >
            Next
          </button>
        </div>
        <p className="text-red-600 text-sm ml-1 my-1.5">{errors.url?.message}</p>
        <div className="flex items-center">
          <div className="border border-gray-300 flex-auto" />
          <p className="bg-white px-6 text-gray-400 text-sm">OR</p>
          <div className="border border-gray-300 flex-auto" />
        </div>
        <div className="mt-3 w-full flex">
          <input
            type="text"
            placeholder="Enter Project Title and let Ency help you"
            name="title"
            ref={register()}
            className="text-sm pl-4 py-2 border rounded-l-full border-gray-400 flex-auto transition-colors duration-300 hover:border-gray-500"
          />
          <button
            className="bg-blue-400 text-white px-5 rounded-r-full hover:bg-blue-500 transition-colors duration-300 border border-blue-400 text-sm"
            onClick={handleTitleSubmit}
          >
            Next
          </button>
        </div>
        <p className="text-red-600 text-sm ml-1 my-1.5">{errors.title?.message}</p>
      </div>
      <div className="flex justify-center items-center gap-x-2 mt-4">
        <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
        <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
      </div>
    </div>
  );
};

const StepTwo: React.FC = () => {
  const { sentenceLimit, setSentenceLimit, setStep } = useCreateProject();

  const handleNext = (): void => {
    setStep("THREE");
  };

  return (
    <div className="max-w-sm flex flex-col">
      <div className="mb-6">
        <LoadingImage />
      </div>
      <p className="font-light text-sm">
        What’s the prefered sentence limit of your summarised project:
      </p>
      <div className="my-8">
        <WordCountSlider value={sentenceLimit} onChange={(value) => setSentenceLimit(value)} />
      </div>
      <button
        className="px-8 py-2 bg-blue-400 text-sm rounded-full text-white ml-auto"
        onClick={() => handleNext()}
      >
        Next
      </button>
      <div className="flex justify-center items-center gap-x-2 mt-4">
        <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
        <span className="h-2 w-2 bg-gray-500 rounded-full"></span>
      </div>
    </div>
  );
};

const LoadingImage: React.FC = () => (
  <div className="h-52 w-full animate-pulse bg-gray-300 flex justify-center items-center text-gray-600">
    <p>Loading...</p>
  </div>
);

type SentenceCountSliderProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const WordCountSlider: React.FC<SentenceCountSliderProps> = ({ value, onChange }) => {
  return (
    <div className="flex">
      <div className="flex-auto">
        <RangeSlider value={value} onChange={onChange} step={3} min={4} max={25} />
      </div>
      <div className="flex flex-col items-center ml-4">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="px-0.5 py-1 border border-gray-400 rounded-md w-10 text-sm text-gray-600 text-center"
        />
        <span className="text-gray-800 text-xs font-light mt-2">Sentences</span>
      </div>
    </div>
  );
};

const StepThree: React.FC = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const { sentenceLimit, url, title } = useCreateProject();
  const router = useRouter();
  const [{ data }, createProject] = useMutation<CreateProjectMutation>(CreateProjectDocument);

  console.log(data);

  useEffect(() => {
    if (url) {
      //useEffect(() => {
      axios
        .post(`${api_url}/summarize-url`, {
          url: url,
          length: sentenceLimit,
          keywords: true,
          api_key: api_key,
        })
        .then((EncyData) => {
          console.log(EncyData.data.output);
          if (!EncyData.data) {
            console.log("Something went wrong");
          }
          try {
            //create project
            const data: CreateProjectMutationVariables = {
              title: "Untitled Project",
              color: randomColor(),
            };
            createProject(data).then((project) => {
              router.push(`project/${project.data?.createProject?.id}`);
            });
          } catch (error) {
            console.log(error);
          }
        });
      //}, []);
    }

    if (title) {
      //useEffect(() => {
      axios.post(`${api_url}/ai-tips`, { word: title, api_key: api_key }).then((res1) => {
        console.log(res1.data);
        if (!res1.data) {
          console.log("Something went wrong");
        }
        console.log(res1.data.recommended_articles[0]);

        axios
          .post(`${api_url}/summarize-url`, {
            url: res1.data.recommended_articles[0],
            length: sentenceLimit,
            keywords: true,
            api_key: api_key,
          })
          .then((EncyData) => {
            // create project with the ai data
            if (!EncyData) {
              console.log("Something went wrong");
            }
            try {
              //create project
              const data: CreateProjectMutationVariables = {
                title: "Untitled Project",
                color: randomColor(),
              };
              createProject(data).then((project) => {
                router.push(`project/${project.data?.createProject?.id}`);
              });
            } catch (error) {
              console.log(error);
            }
          });
      });
      //}, [])
    }
  }, []);
  return (
    <div className="max-w-sm">
      <LoadingImage />
      <p className="mt-8 text-sm font-light text-center">Lorem ipsum bs here</p>
    </div>
  );
};
