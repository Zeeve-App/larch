import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    linkClicked: () => set((state : any) => ({ count: state.count + 1 }))
  
  }))
  export default useStore












 