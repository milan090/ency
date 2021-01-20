import { createContext, useContext, useState } from "react";
import { UseAutoSave } from "types/common.types";

const autoSaveContext = createContext<UseAutoSave>({
  notSaved: [],
  addItemToSave: () => {
    // pass
  },
  removeItemToSave: () => {
    // pass
  },
});

export function AutoSaveProvider(props: { children: React.ReactNode }): JSX.Element {
  const [notSaved, setNotSaved] = useState<string[]>([]);

  const addItemToSave = (item: string): void => {
    if (!notSaved.includes(item)) {
      console.log("Adding");
      setNotSaved([...notSaved, item]);
    }
  };

  const removeItemToSave = (item: string): void => {
    console.log("removing");
    setNotSaved(notSaved.filter((notSavedItem) => notSavedItem !== item));
  };

  return (
    <autoSaveContext.Provider
      value={{
        notSaved,
        addItemToSave,
        removeItemToSave,
      }}
    >
      {props.children}
    </autoSaveContext.Provider>
  );
}

export function useAutoSave() {
  return useContext(autoSaveContext);
}
