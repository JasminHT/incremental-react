import { create } from 'zustand'

let clearTimeoutId; //used to debounce hovers

export const useHoverText = create(

  (set, get) => ({
    hoverText: "no text yet",
    hoverColor: 'black',
    setHoverText: (text, color) => {
      clearTimeout(clearTimeoutId);
      set({hoverText: "Cost: "+text, hoverColor: color});
    },
    clearHoverText: () => {
      clearTimeout(clearTimeoutId);
      clearTimeoutId = setTimeout(
        () => set({ hoverText: "" })
      );
    }

  })
)
