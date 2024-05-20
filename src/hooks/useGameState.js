import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import cost from '../model/cost.js'


export function useReset() {
  return useGameState((state) => state.reset)
}

export function useResource(type) {
  return [
    useGameState((state) => state[type]),
    useGameState((state) => state.addResource)
    ];
}

export function useResourceMax(type) {
  return [ 
    //useGameState((state) => state.getMax()),
    //the above code doesn't work. You need to directly refer to the variable to subscribe to it
    useGameState((state) => state[type+"_max"]),
    useGameState((state) => state.addMax) 
    ]
}

//The three functions below could be combined into a functio nthat takes another parameter
export function useCost(suffix="") {
  return [ 
    useGameState((state) => state.getCostString(suffix)),
    useGameState((state) => state.payCost(suffix)),
    useGameState((state) => state.affordCost(suffix))
    ]
}



const initialState = {

  energy: 0, energy_max: 100, 
  scrap_metal: 0, scrap_metal_max: 20,
  battery: 0, battery_max: 20, 
  crankbot: 50, crankbot_max: 100,
  duranium: 0, duranium_max: 20,
  solar_panel: 0, solar_panel_max: 10,
  scrap_generator: 0, scrap_generator_max: 10,

}

export const useGameState = create(persist(

  (set, get) => ({
    ...initialState,

    reset: function() {
      set(initialState)
    },

    addResource: function(type, count) { 
        let new_amount = get()[type] + count;

        if (new_amount > get()[type+"_max"]) {
          set({ [type]:  get()[type+"_max"]})
        }

        else if (new_amount < 0 ) {
          set({ [type]: 0 })
        }

        else {
          set({ [type]: get()[type] + count })
        }
    },

    addMax: function(type, count) {
      set({ [type+"_max"]: get()[type+"_max"] + count })
    },



    payCost: function(suffix="") {
      if (suffix)
        suffix="_"+suffix;

      return function(type) {
      
        for (const [cost_type, cost_count] of Object.entries(cost(type+suffix))) {
          set({ [cost_type]: Math.max(0, get()[cost_type] - cost_count) })
        }
      }

    },

    affordCost: function(suffix="") {
      if (suffix)
        suffix="_"+suffix;

      return function(type) {
        if (!cost(type+suffix)) return false;      
        for (const [cost_type, cost_count] of Object.entries(cost(type+suffix))) {
          if (get()[cost_type] < cost_count)
            return false;
        }
        return true;
      }
    },

    getCostString: function(suffix="") {
      if (suffix)
        suffix="_"+suffix;

      return function(type) {
        let cost_string = "";
        if (!cost(type+suffix)) return "";        
        for (const [cost_type, cost_count] of Object.entries(cost(type+suffix))) {
          cost_string = cost_string+cost_type+": "+cost_count+", ";
        }
        return cost_string;
      }
    }





  }),

  //options
  {
    name: 'gameState', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },

))
