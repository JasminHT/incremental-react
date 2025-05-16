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
    useGameState((state) => state[type+"_max"]),
    useGameState((state) => state.addMax(type)) 
    ]
}

export function useCost(type, suffix="") {
  return [ 
    useGameState((state) => state.getCost(type, suffix)),
    useGameState((state) => state.payCost(type, suffix)),
    useGameState((state) => state.affordCost(type, suffix))
    ]
}

export function usePartialCost(type, resource, suffix="") {
  return [
    useGameState((state) => state.affordPartialCost(type,resource,suffix))
  ]
}

export function useWholeState() {
  return [useGameState((state) => state.getWholeState())];
}



const initialState = {

  resource: 0, resource_max: {base: 100, increment: 20, bonuses: 0},
  energy: 0, energy_max: 100, 
  scrap_metal: 0, scrap_metal_max: 20,
  battery: 0, battery_max: 20, 
  crankbot: 1, crankbot_max: 10,
  duranium: 0, duranium_max: 20,
  solar_panel: 0, solar_panel_max: 10,
  scrap_generator: 0, scrap_generator_max: 10,

  unlockedFabricators: {
    scrap_metal: false,
    battery: false,
    crankbot: false,
    duranium: false,
    solar_panel: false,
    scrap_generator: false,
  },
}

export const useGameState = create(immer(persist(

  (set, get) => ({
    ...initialState,

    reset: function() {
      set(initialState)
    },

    getWholeState: function() {
      return get();
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

    affordPartialCost: function(type, resource, suffix="") {
      suffix = suffix ? "_"+suffix : ""
      let costob = cost(type+suffix) || ""; 

      if (get()[resource] >= costob[resource] ) {
        return true;
      } else {
        return false;
      }
    },

    affordCost: function(type, suffix="") {
    
      suffix = suffix ? "_"+suffix : ""

      let can_afford = true; //changes to false if the price is too high

      return () => {      
        let costob = cost(type+suffix) || ""; 

        if (!costob) {
          can_afford = false;
        }     

        //you cannot return from inside a forEach!!!
        Object.entries(costob).forEach( ([cost_type, cost_count]) => {
          if (!get().affordPartialCost(type, cost_type, suffix)) {
            can_afford = false;
          }
        })

        return can_afford;
      }
    },

    getCost: function(type, suffix="") {
      if (suffix)
        suffix="_"+suffix;

      return () => {
        let cost_object = cost(type+suffix) || {};        
        return cost_object;
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
    },


    unlockFabricator: function(type) {
      set(state => {
        state.unlockedFabricators[type] = true;
      });
    },

  }),

  //options
  {
    name: 'gameState', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage),
  },

)))
