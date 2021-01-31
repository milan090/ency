import CustomButton from "components/custom-button/custom-button.component";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";
import ModalContainer from "components/modal-container/modal-container.component";
import SummarizeForm from "components/summarize-form/summarize-form.component";
import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { SummarizeMode } from "types/summarise.types";
import { summarizeText, summarizeUrl } from "utils/aiApi";

const SummariseTextUrl: React.FC = () => {
  const [mode, setMode] = useState<SummarizeMode>(null);
  const [value, setValue] = useState("");
  const [summarizedValue, setSummarizedValue] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [recommendedArticles, setRecommendedArticles] = useState<string[]>([]);
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
    setSummarizedValue("");
    if (apiMode === "url") {
      try {
        setIsLoading(true);
        const data = await summarizeUrl(apiValue);
        setSummarizedValue(data.output);
        if (data.keywords) {
          setKeywords(data.keywords);
        }
        if (data.recommendedArticles) {
          setRecommendedArticles(data.recommendedArticles);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else if (apiMode === "text") {
      try {
        setIsLoading(true);
        const data = await summarizeText(apiValue);
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
              Ency is a powerful text summarizer, which can give you a summary of a text or a URL.
              It can also give you suggestions for Wikipedia articles, as well as importants
              keywords.
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
              Ency is an Artificial Intelligence based on Transformers, a recent Deep Learning
              model, widely used for summarization and translation tasks, but more generally for
              Natural Language Processing (NLP).
            </li>
            <li className="my-4">
              Ency is based on the Distilbert model, a variant of Bert, an AI model developed by
              Google Research in 2019. This model is based on Transformers. Our AI uses
              the Transfer Learning method, to avoid the need for extensive training, which can last
              several weeks. So we import a Distilbert configuration, and we rewrite the model.
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
          <div>
            {keywords && (
              <div className="mb-5">
                <KeywordList keywords={keywords} />
              </div>
            )}
            <p>{summarizedValue}</p>
            {recommendedArticles && (
              <div className="mt-5">
                <div className="pb-4">
                  <h1 className="text-lg font-bold">Suggested Articles</h1>
                  <hr className="bg-primary w-12 h-1.5 mt-1" />
                </div>
                <RecommendedArticles recommendedArticles={recommendedArticles} />{" "}
              </div>
            )}
          </div>
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
        <h2 className="text-lg text-gray-500 mb-5">Summarize Webpage</h2>
        <div className="flex items-start">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full max-w-2xl px-3 py-1.5 rounded-sm outline-none"
          />
          <CustomButton className="mx-5" onClick={handleSubmit}>
            Summarize Again
          </CustomButton>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-5 mb-16">
      <h2 className="text-lg text-gray-500 mb-5">Summarize Text</h2>
      <div className="flex items-start">
        <textarea
          cols={45}
          rows={5}
          className="outline-none rounded-sm border border-gray-300 focus:border-gray-400 px-2 py-2 resize-none"
          placeholder="Paste or enter some text to summarize"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <CustomButton className="mx-5" onClick={handleSubmit}>
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

type KeywordListProps = {
  keywords: string[];
};

const KeywordList: React.FC<KeywordListProps> = ({ keywords }) => (
  <div className="flex flex-wrap text-sm">
    {keywords.map((keyword, i) => (
      <div
        key={i}
        className="border-2 rounded-full border-primary px-3 py-1 mr-2 mb-1.5 capitalize"
      >
        <span>{keyword}</span>
      </div>
    ))}
  </div>
);

type RecommendedArticlesProps = {
  recommendedArticles: string[];
};

const RecommendedArticles: React.FC<RecommendedArticlesProps> = ({ recommendedArticles }) => (
  <ul className="list-disc list-inside">
    {recommendedArticles.map((recommendedArticle, i) => (
      <li key={i} className="break-words text-blue-500 hover:underline">
        <a href={recommendedArticle}>{recommendedArticle}</a>
      </li>
    ))}
  </ul>
);

export default SummariseTextUrl;
