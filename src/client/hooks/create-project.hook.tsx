import create from "zustand";

type Step = "ONE" | "TWO" | "THREE";

type UseCreateProject = {
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  sentenceLimit: number;
  setSentenceLimit: (wordLimit: number) => void;
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
  sentenceLimit: 25,
  setSentenceLimit: (sentenceLimit: number) => set(() => ({ sentenceLimit: sentenceLimit })),
  step: "ONE",
  setStep: (step: Step) => set(() => ({ step: step })),
  reset: () => set(() => ({ url: "", title: "", step: "ONE", sentenceLimit: 8 })),
}));
