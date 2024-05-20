


export default function cost(type) {
  return new_costs_json[type];
}



const new_costs_json = {

    scrap_metal: {energy: 5},
    battery: {scrap_metal: 10},
    crankbot: {battery: 2, scrap_metal: 15, energy: 30},
    duranium: {energy: 50, scrap_metal: 50},
    solar_panel: {battery: 5, scrap_metal: 20, duranium: 5},
    scrap_generator: {crankbot: 2},

    scrap_metal_boost: {energy: 10},
    battery_boost: {scrap_metal: 10},
    crankbot_boost: {energy: 10},
    duranium_boost: {energy: 10},
    solar_panel_boost: {energy: 10},
    scrap_generator_boost: {energy: 10},

    energy_max_increase: {energy: 5},
    scrap_metal_max_increase: {energy: 10},
    battery_max_increase: {energy: 20},
    crankbot_max_increase: {energy: 30},
    duranium_max_increase: {energy: 40},
    solar_panel_max_increase: {energy: 50},
    scrap_generator_max_increase: {energy: 60}


  }
