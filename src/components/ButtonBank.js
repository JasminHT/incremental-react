import React, {useState, useEffect, createContext} from 'react';

import useInterval from '../hooks/useInterval.js';

import Button from './Button.js';
import Fabricator from './Fabricator.js';
import Miner from './Miner.js';
import Hint from './Hint.js'

import {useReset, useGameState} from '../hooks/useGameState.js';


export default function ButtonBank () {

  const reset = useGameState((state) => state.reset);

  let farms = useGameState((state) => state.farm);
  let crankbots = useGameState((state) => state.crankbot);
  let solar_panels = useGameState((state) => state.solar_panel);
  let scrap_generators = useGameState((state) => state.scrap_generator);
  let addResource = useGameState((state) => state.addResource);

  useInterval(step, 1000);
  function step() { 
    addResource('food', farms);
    addResource('energy', Math.ceil(crankbots))
    addResource('scrap_metal', Math.ceil(scrap_generators))
  }

  useInterval(tinyStep, 100);
  function tinyStep() { 
    addResource('energy', Math.ceil(solar_panels))
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


