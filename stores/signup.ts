import create from "zustand";
import { persist } from "zustand/middleware";

interface Tag {
  name: string;
  weight: number | null;
}

interface SignupState {
  activeStep: number;
  nextStep: () => void;
  prevStep: () => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  insertTag: (index: number, tag: Tag) => void;
  updateTag: (index: number, tag: Tag) => void;
  deleteTag: (index: number) => void;
}

const useStoreSignup = create<SignupState>()(
  persist((set) => ({
    activeStep: 0,
    nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
    prevStep: () => set((state) => ({ activeStep: state.activeStep - 1 })),
    tags: [{ name: "", weight: null }],
    setTags: (tags: Tag[]) => set(() => ({ tags })),
    insertTag: (index: number, tag: Tag) =>
      set((state) => {
        const tags = [...state.tags];
        tags.splice(index, 0, tag);
        return { tags };
      }),
    updateTag: (index: number, tag: Tag) => {
      set((state) => {
        const tags = [...state.tags];
        tags[index] = tag;
        return { tags };
      });
    },
    deleteTag: (index: number) => {
      set((state) => {
        const tags = [...state.tags];
        tags.splice(index, 1);
        return { tags };
      });
    },
  }))
);

export default useStoreSignup;
