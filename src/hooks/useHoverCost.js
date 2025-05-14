import { create } from 'zustand'

import { useHoverText } from "./useHoverText.js";

export const useHoverCost = () => {
    const {setHoverText, clearHoverText} = useHoverText();

    return {
        setHoverCost: (cost, color) => {

            let cost_string = "Cost: ";
            if (cost) {
                for (let[cost_name, cost_value] of Object.entries(cost)) {
                    cost_string += cost_name+": "+cost_value+"; ";
                }
            }
            setHoverText(cost_string, color);
        },

        clearHoverCost: (cost) => {
            clearHoverText();
        }
    }

  }