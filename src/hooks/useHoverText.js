import { create } from 'zustand'

let clearTimeoutId; //used to debounce hovers

export function useSetHoverText() {
  return useHoverText((state) => state.setText)
}

export function useGetHoverText() {
  return useHoverText((state) => state.hoverText)
}

export function useClearHoverText() {
  return useHoverText((state) => state.clearText)
}

export const useHoverText = create(

  (set, get) => ({
    hoverText: "no text yet",
    setText: (text) => {
      clearTimeout(clearTimeoutId);
      set({hoverText: "Cost: "+text});
    },
    clearText: () => {
      clearTimeout(clearTimeoutId);
      clearTimeoutId = setTimeout(
        () => set({ hoverText: "" })
      );
    }

  })

)

