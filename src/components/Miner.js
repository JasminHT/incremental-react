import React from 'react';

import { useResource, useResourceMax, useGameState }  from '../hooks/useGameState.js';

import Button from './Button.js';
import Counter from './Counter.js';
import LoadBar from './LoadBar.js';
import MaxButton from './MaxButton.js'

export default function Miner( {type, color} ) {

  const [resource, addResource] = useResource(type);
  const [resourceMax, addResourceMax] = useResourceMax(type);

  const getCost = useGameState((state) => state.getCostString());

  return (
    <div className="Miner">
      <Counter value={ resource } max={ resourceMax } />
      <Button type={type} hoverText={ getCost() } onClick={()=>addResource(1)} >
        {"Get "+type}
      </Button>
      <LoadBar progress={ resource } totalProgress={resourceMax} color={color} />
      <MaxButton type={type} />  
    </div>
  );
}