import { create } from 'zustand'


export function useSetHoverText() {
  return useHoverText((state) => state.setText)
}

export function useGetHoverText() {
  return useHoverText((state) => state.hoverText)
}

export const useHoverText = create(

  (set, get) => ({
    hoverText: "no text yet",
    setText: (text) => set({hoverText: "Cost: "+text} ),
  })

)

