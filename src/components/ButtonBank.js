import React from 'react';

import useInterval from 'hooks/useInterval.js';

import Button from './Button.js';
import Fabricator from './Fabricator.js';
import Miner from './Miner.js';
import ObjectHint from './ObjectHint.js';

import {useResource, useGameState} from 'hooks/useGameState.js';


export default function ButtonBank () {

  const reset = useGameState((state) => state.reset);

  const unlockedFabricators = useGameState(state => state.unlockedFabricators);
  const unlockFabricator = useGameState(state => state.unlockFabricator);
  
  let crankbots = useGameState((state) => state.crankbot);
  let solar_panels = useGameState((state) => state.solar_panel);
  let scrap_generators = useGameState((state) => state.scrap_generator);
  
  let addScrapMetal = useGameState((state) => state.addResource('scrap_metal'))
  let addEnergy = useGameState((state) => state.addResource('energy'))

  const unlock_requirements = {
    scrap_metal: { energy: 10 },
    battery: { scrap_metal: 5 },
    crankbot: { battery: 1 },
    duranium: {crankbot: 1},
    solar_panel: {duranium: 1},
    scrap_generator: {solar_panel: 1},
  };

  function requirementMet(type) {
    const req = unlock_requirements[type];
    if (!req) 
      return true;

    return Object.entries(req).every(
      ([res,amount]) => useGameState.getState()[res] >= amount
    );
  }

  useInterval(step, 1000);
  function step() { 
    addEnergy(Math.ceil(crankbots))
    addScrapMetal(Math.ceil(scrap_generators))
  }

  useInterval(tinyStep, 100);
  function tinyStep() { 
    addEnergy( Math.ceil(solar_panels))
  }

  return (
    <>
        <Button onClick={reset}> Reset </Button>
        <br/>

        <Miner type="energy" color="blue" />

        {/*
        <Fabricator label='Scrap metal' type='scrap_metal' color='lightgrey' />
        <Fabricator label='Battery' type='battery' color='white' />
        <Fabricator label='Crankbots' type='crankbot' color='orange' />
        <Fabricator label='Duranium' type='duranium' color='purple' /> 
        <Fabricator label='Solar panels' type='solar_panel' color='red' />    
        <Fabricator label='Scrap generator' type='scrap_generator' color='black' />      
        */}

        {Object.entries(unlock_requirements).map(([type, req]) => {
          // Unlock if requirement met and not already unlocked
          if (!unlockedFabricators[type] && requirementMet(type)) {
            unlockFabricator(type);
          }
          if (unlockedFabricators[type] || requirementMet(type)) {
            return <Fabricator label={type} type={type} />;
          }
          return null;
        })}

        <ObjectHint />
      </>
  );
};


