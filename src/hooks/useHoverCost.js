import { useHoverText } from "./useHoverText.js";
import { useGameState } from "./useGameState.js";

export const useHoverCost = () => {
    const {setHoverText, clearHoverText} = useHoverText();
    const { affordPartialCost } = useGameState();

    return {
        setHoverCost: (type, cost, color) => {

            let cost_string = "Cost: ";
            if (cost) {
                for (let[cost_name, cost_value] of Object.entries(cost)) {
                    if (!affordPartialCost(type, cost_name))  //suffix should be here
                        color = "red";
                    cost_string += cost_name+": "+cost_value+"; ";
                }
            }
            setHoverText(cost_string, color);
        },

        clearHoverCost: () => {
            clearHoverText();
        }
    }
}