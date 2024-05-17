import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export function useReset() {
  return useGameState((state) => state.reset)
}

export function useResource(type) {
  
  let resource = useGameState((state) => state[type]);
  let addResource = useGameState((state) => state.addCapped(type));

  return [resource, addResource];
}

export function useResourceMax(type) {
  
  return [ useGameState((state) => state[type+"_max"]),
           useGameState((state) => state.addMax(type)) ]
}


const initialState = {
  food: 0, food_max: 10,
  wood: 0, wood_max: 10,
  stone: 0, stone_max: 20,

  farm: 0, farm_max: 5,
  house: 0, house_max: 5,
  wall: 0, wall_max: 5,
}

export const useGameState = create(persist(

  (set, get) => ({
    ...initialState,

    add: (type, count) => set({ [type]: get()[type] + count }),

    addMax: (type) => {
      return (count) => set({ [type+"_max"]: get()[type+"_max"] + count })
    },

    addCapped: (type) => { 
      return (count) => {
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
      }
    },

    reset: () => {
      set(initialState)
    },

      
  }),

  //options
  {
    name: 'gameState', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  },

))
