import { createContext, useContext, useState } from "react";
import { FirebaseDocRef, UseProject } from "types/common.types";

const projectContext = createContext<UseProject>({
  projectRef: undefined,
  setProjectRef: () => {
    // pass
  },
});

export function ProjectProvider(props: { children: React.ReactNode }): JSX.Element {
  const [projectRef, setProjectRef] = useState<FirebaseDocRef>();

  return (
    <projectContext.Provider
      value={{
        projectRef,
        setProjectRef,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
}

export function useProject() {
  return useContext(projectContext);
}
