import React from "react";
import { useAutoSave } from "hooks/useAutoSave";
import { Check, UploadCloud } from "react-feather";

const AutoSaveIndicator: React.FC = () => {
  const { notSaved } = useAutoSave();

  return (
    <div className="float-right">
      <span>
        {notSaved.length === 0 ? (
          <span className="flex items-center justify-center">
            <Check className="mr-1 bg-transparent rounded-full stroke-primary" />{" "}
            <span>Saved!</span>
          </span>
        ) : (
          <span className="flex items-center justify-center animate-pulse">
            <UploadCloud className="mr-2 bg-transparent rounded-full stroke-primary" />{" "}
            <span>Autosaving...</span>
          </span>
        )}
      </span>
    </div>
  );
};

export default AutoSaveIndicator;
