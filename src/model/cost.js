
const costs_json = {
    farm: {res: 'wood', count: 10},
    house: {res: 'wood', count: 20},
    wall: {res: 'stone', count: 10}
  }

export default function cost(type) {
  return costs_json[type];
}