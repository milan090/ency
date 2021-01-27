import React from "react";
import { useAutoSave } from "hooks/useAutoSave";
import { Check, UploadCloud } from "react-feather";

const AutoSaveIndicator: React.FC = () => {
  const { notSaved } = useAutoSave();

  return (
    <div>
      {notSaved.length === 0 ? (
        <div className="flex items-center justify-end">
          <Check className="mr-1 bg-transparent rounded-full stroke-primary" /> <span>Saved!</span>
        </div>
      ) : (
        <div className="flex items-center animate-pulse justify-end">
          <UploadCloud className="mr-2 bg-transparent rounded-full stroke-primary" />{" "}
          <span>Autosaving...</span>
        </div>
      )}
    </div>
  );
};

export default AutoSaveIndicator;
