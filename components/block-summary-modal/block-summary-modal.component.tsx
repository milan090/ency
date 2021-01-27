import ModalContainer from "components/modal-container/modal-container.component";
import React, { useEffect, useState } from "react";
import { summarizeText } from "utils/aiApi";
import LoadingSpinner from "components/loading-spinner/loading-spinner.component";

type Props = {
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
  value: string;
};

const BlockSummaryModal: React.FC<Props> = ({ isHidden, setIsHidden, value }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const res = await summarizeText(value, 1);
        setSummary(res.output);
      } catch (error) {
        console.error(error);
        setSummary("Oops something went wrong! We will try to fix this soon");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <ModalContainer isHidden={isHidden} setIsHidden={setIsHidden} title="Summarize Block">
      <div className="mb-8 flex items-center justify-center">
        {/* purgecss: w-10 h-10 */}
        {isLoading && <LoadingSpinner size={10} />}
        <p>{summary}</p>
      </div>
    </ModalContainer>
  );
};

export default BlockSummaryModal;
