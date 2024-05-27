import React from 'react';

import useInterval from 'hooks/useInterval.js';

import Button from './Button.js';
import Fabricator from './Fabricator.js';
import Miner from './Miner.js';
import Hint from './Hint.js'

import {useResource, useGameState} from 'hooks/useGameState.js';


export default function ButtonBank () {

  const reset = useGameState((state) => state.reset);

  let crankbots = useGameState((state) => state.crankbot);
  let solar_panels = useGameState((state) => state.solar_panel);
  let scrap_generators = useGameState((state) => state.scrap_generator);
  
  let addScrapMetal = useGameState((state) => state.addResource('scrap_metal'))
  let addEnergy = useGameState((state) => state.addResource('energy'))

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
        <Button text="Reset" onClick={reset} />
        <br/>

        <Miner type="energy" color="blue" />

        <Fabricator label='Scrap metal' type='scrap_metal' color='lightgrey' />
        <Fabricator label='Battery' type='battery' color='white' />
        <Fabricator label='Crankbots' type='crankbot' color='orange' />
        <Fabricator label='Duranium' type='duranium' color='purple' /> 
        <Fabricator label='Solar panels' type='solar_panel' color='red' />    
        <Fabricator label='Scrap generator' type='scrap_generator' color='black' />      

        <Hint />
    </>
  );
};


