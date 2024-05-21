import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import cost from 'model/cost.js'

export function useReset() {
  return useGameState((state) => state.reset)
}

export function useResource(type) {
  return [
    useGameState((state) => state[type]),
    useGameState((state) => state.addResource(type))
    ];
}

export function useResourceMax(type) {
  return [ 
    //useGameState((state) => state.getMax()),
    //the above code doesn't work. You need to directly refer to the variable to subscribe to it
    useGameState((state) => state[type+"_max"]),
    useGameState((state) => state.addMax(type)) 
    ]
}

//The three functions below could be combined into a functio nthat takes another parameter
export function useCost(type, suffix="") {
  return [ 
    useGameState((state) => state.getCostString(type, suffix)),
    useGameState((state) => state.payCost(type, suffix)),
    useGameState((state) => state.affordCost(type, suffix))
    ]
}



const initialState = {

  resource: 0, resource_max: {base: 100, increment: 20, bonuses: 0},
  energy: 0, energy_max: 100, 
  scrap_metal: 0, scrap_metal_max: 20,
  battery: 0, battery_max: 20, 
  crankbot: 5, crankbot_max: 100,
  duranium: 0, duranium_max: 20,
  solar_panel: 0, solar_panel_max: 10,
  scrap_generator: 0, scrap_generator_max: 10,

}

export const useGameState = create(immer(persist(

  (set, get) => ({
    ...initialState,

    reset: function() {
      set(initialState)
    },

    addResource: function(type) { 
      return (count) => {
        let new_amount = get()[type] + count;
        let max_amount = get()[type+"_max"];

        set((state) => {state[type] = Math.max(0, Math.min(new_amount, max_amount))} );

      }
    },

    addMax: function(type) {
      return (count) => {
        set((state) => {state[type+"_max"] = get()[type+"_max"] + count })
      }
    },



    payCost: function(type, suffix="") {
      suffix = suffix ? "_"+suffix : ""

      return () => {
        for (const [cost_type, cost_count] of Object.entries(cost(type+suffix))) {
          set((state) => { state[cost_type] = Math.max(0, get()[cost_type] - cost_count) } );
          //set({ [cost_type]: Math.max(0, get()[cost_type] - cost_count) })
        }
      }

    },

    affordCost: function(type, suffix="") {
      
      suffix = suffix ? "_"+suffix : ""

      return () => {      
        let costob = cost(type+suffix) || ""; 
        if (!costob) 
          return false;       
        Object.entries(costob).forEach( ([cost_type, cost_count]) => {
          if (get()[cost_type] < cost_count)
            return false;
        })
        return true;
      }
    },

    getCostString: function(type, suffix="") {
      if (suffix)
        suffix="_"+suffix;

      return () => {
        let cost_string = "";
        let costob = cost(type+suffix) || "";        
        Object.entries(costob).forEach( ([cost_type, cost_count]) => {
          cost_string = cost_string+cost_type+": "+cost_count+"; ";
        })
        return cost_string;
      }
    }





  }),

  //options
  {
    name: 'gameState', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage),
  },

)))
