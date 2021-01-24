import CustomButton from "components/custom-button/custom-button.component";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";
import ModalContainer from "components/modal-container/modal-container.component";
import SummarizeForm from "components/summarize-form/summarize-form.component";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { SummarizeMode } from "types/summarise.types";
import axios from "axios";
import { auth } from "config/firebase";

const SummariseTextUrl: React.FC = () => {
  const [mode, setMode] = useState<SummarizeMode>(null);
  const [value, setValue] = useState("");
  const [summarizedValue, setSummarizedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormHidden, setIsFormHidden] = useState(true);

  const handleGoBack = (): void => {
    setMode(null);
    setValue("");
    setSummarizedValue("");
  };

  const handleSummarize = async (newValue?: string, newMode?: SummarizeMode): Promise<void> => {
    const apiValue = value || newValue;
    const apiMode = mode || newMode;
    if (!apiValue) return alert("No value entered");

    if (apiMode === "url") {
      try {
        setIsLoading(true);
        const userIdToken = await auth.currentUser?.getIdToken();
        const res = await axios.post(
          "/api/summarize/url",
          {
            url: apiValue,
          },
          {
            headers: {
              Authorization: `Bearer ${userIdToken}`,
            },
          }
        );
        const data = res.data;
        setSummarizedValue(data.output);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else if (apiMode === "text") {
      try {
        setIsLoading(true);
        const userIdToken = await auth.currentUser?.getIdToken();
        const res = await axios.post(
          "/api/summarize/text",
          {
            text: value || apiValue,
          },
          {
            headers: {
              Authorization: `Bearer ${userIdToken}`,
            },
          }
        );
        const data = res.data;
        setSummarizedValue(data.output);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (mode === null) {
    return (
      <div>
        <div className="mb-12">
          <SummarizeHeadder onClick={handleGoBack} mode={mode} />
          <div className="mb-10">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius nisi eum excepturi
              voluptatum nobis ducimus repellendus doloremque iure rem id officiis consequatur autem
              dicta architecto aperiam, alias, iste quaerat reiciendis?
            </p>
          </div>
          <CustomButton onClick={() => setIsFormHidden(false)}>Summarise Stuff here!</CustomButton>
          <ModalContainer isHidden={isFormHidden} setIsHidden={setIsFormHidden} title="Summarize">
            <SummarizeForm
              handleFormSubmission={(mode: SummarizeMode, value?: string) => {
                setMode(mode);
                setValue(value || "");
                setIsFormHidden(true);

                handleSummarize(value, mode);
              }}
            />
          </ModalContainer>
        </div>
        <div>
          <h4
            className="text-gray-500 font-semibold text-xl mb-12 w-full text-center border-b-2 border-solid border-gray-400"
            style={{ lineHeight: "0.1em" }}
          >
            <span className="px-5 bg-gray-200">How does it work</span>
          </h4>
          <ol className="list-decimal list-inside text-gray-500">
            <li className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt est assumenda nulla
              exercitationem corrupti iste nemo excepturi doloribus, quae autem dolor error illum
              atque rerum quaerat aperiam omnis culpa maiores!
            </li>
            <li className="my-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui ipsum explicabo libero
              fugit quas, doloribus autem ipsa dolorem. Non magnam eveniet nemo, cumque quo
              aspernatur! Quisquam magnam amet assumenda et.
            </li>
          </ol>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SummarizeHeadder onClick={handleGoBack} mode={mode} />
      <EditValue mode={mode} value={value} onChange={setValue} handleSubmit={handleSummarize} />
      <SummarizeInfoHereHeading />
      <div>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center pt-10">
            {/* purge-css: w-16 h-16 */}
            <LoadingSpinner size={16} />
            <p className="mt-5">This will take a few moments</p>
          </div>
        ) : (
          <p>{summarizedValue}</p>
        )}
      </div>
    </div>
  );
};

type SummarizeHeadderProps = {
  onClick: () => void;
  mode: SummarizeMode;
};

const SummarizeHeadder: React.FC<SummarizeHeadderProps> = ({ onClick, mode }) => {
  return (
    <div className="mt-16 mb-10 flex items-center justify-between">
      <div className="">
        <h1 className="font-bold text-3xl">Summarize</h1>
        <hr className="bg-primary h-1.5 w-16" />
      </div>
      {!!mode && (
        <ArrowLeft
          className="bg-primary stroke-white rounded-full p-1 cursor-pointer border-2 border-primary hover:bg-transparent hover:stroke-primary transition-colors duration-150 ease-in-out"
          size="28px"
          onClick={onClick}
        />
      )}
    </div>
  );
};

type EditValueProps = {
  mode: SummarizeMode;
  value: string;
  onChange: (value: string) => void;
  handleSubmit: () => void;
};

const EditValue: React.FC<EditValueProps> = ({ mode, onChange, value, handleSubmit }) => {
  if (mode === "url") {
    return (
      <div className="mt-5 mb-16">
        <h2 className="text-lg text-gray-500 mb-5">Summarize Text</h2>
        <div className="flex">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full max-w-2xl px-3 py-1 outline-none"
          />
          <CustomButton className="h-10 mx-5" onClick={handleSubmit}>
            Summarize Again
          </CustomButton>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-5 mb-16">
      <h2 className="text-lg text-gray-500 mb-5">Summarize Text</h2>
      <div className="flex">
        <textarea
          cols={45}
          rows={5}
          className="outline-none rounded-sm border border-gray-300 focus:border-gray-400 px-2 py-2 resize-none"
          placeholder="Paste or enter some text to summarize"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <CustomButton className="h-10 mx-5" onClick={handleSubmit}>
          Summarize Again
        </CustomButton>
      </div>
    </div>
  );
};

const SummarizeInfoHereHeading: React.FC = () => (
  <h4
    className="text-gray-500 font-semibold text-xl mb-12 w-full text-center border-b-2 border-solid border-gray-400"
    style={{ lineHeight: "0.1em" }}
  >
    <span className="px-5 bg-gray-200">Summary</span>
  </h4>
);

export default SummariseTextUrl;
