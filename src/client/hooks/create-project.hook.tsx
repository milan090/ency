import create from "zustand";

type Step = "ONE" | "TWO" | "THREE";

type UseCreateProject = {
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  wordLimit: number;
  setWordLimit: (wordLimit: number) => void;
  step: Step;
  setStep: (step: Step) => void;
  reset: () => void;
};

export const useCreateProject = create<UseCreateProject>((set) => ({
  url: "",
  // Reset title when setting url
  setUrl: (url: string) => set(() => ({ url: url, title: "" })),
  title: "",
  // Reset URL when setting title
  setTitle: (title: string) => set(() => ({ title: title, url: "" })),
  wordLimit: 100,
  setWordLimit: (wordLimit: number) => set(() => ({ wordLimit: wordLimit })),
  step: "ONE",
  setStep: (step: Step) => set(() => ({ step: step })),
  reset: () => set(() => ({ url: "", title: "", step: "ONE", wordLimit: 100 })),
}));
