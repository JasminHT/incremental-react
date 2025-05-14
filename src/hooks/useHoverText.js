import { create } from 'zustand'

let clearTimeoutId; //used to debounce hovers

export const useHoverText = create(

  (set, get) => ({
    hoverText: "no text yet",
    setHoverText: (text) => {
      clearTimeout(clearTimeoutId);
      set({hoverText: "Cost: "+text});
    },
    clearHoverText: () => {
      clearTimeout(clearTimeoutId);
      clearTimeoutId = setTimeout(
        () => set({ hoverText: "" })
      );
    }

  })
)
