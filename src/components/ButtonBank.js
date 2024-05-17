import React, {useState, useEffect, createContext} from 'react';

import useInterval from '../hooks/useInterval.js';

import Button from './Button.js';
import Counter from './Counter.js';
import Fabricator from './Fabricator.js';
import Miner from './Miner.js';
import LoadBar from './LoadBar.js';

import {useReset, useResource} from '../hooks/useGameState.js';

export default function ButtonBank () {

  const reset = useReset();
  const [food, addFood] = useResource('food')
  const [farmCount, addFarms] = useResource('farm')

  useInterval(step, 1000);
  function step() { 
    addFood(farmCount);
  }

  return (
    <>
        <Button text="Reset" onClick={reset} />
        <br/>

        <Miner type="food" color="blue" />
        <Miner type="wood" color="blue" />
        <Miner type="stone" color="blue" />

        <Fabricator label='Grow a Farm' type='farm' color='green' />
        <Fabricator label='Build a House' type='house' color='brown' />
        <Fabricator label='Build a Wall' type='wall' color='red' /> 
    </>
  );
};


