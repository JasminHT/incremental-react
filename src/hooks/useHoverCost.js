import { useGameState } from "./useGameState.js";
import { create } from 'zustand'



export const useHoverCost = create(

    (set, get) => ({
    
        hover_cost: {},
        hover_type: {},

        setHoverCost: (type, cost) => {
            set({hover_cost: cost, hover_type: type});
        },

        clearHoverCost: () => {
            set({ hover_cost: {} })
        }
    })
)
