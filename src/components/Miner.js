import React, {useContext, useRef} from 'react';

import { useResource, useResourceMax, useGameState }  from '../hooks/useGameState.js';

import Button from './Button.js';
import Counter from './Counter.js';
import LoadBar from './LoadBar.js';
import MaxButton from './MaxButton.js'

import cost from '../model/cost.js';

export default function Miner( {type, color} ) {

  const [resource, addResource] = useResource(type);
  const [resourceMax, addResourceMax] = useResourceMax(type);

  const getCost = useGameState((state) => state.getCostString());

  return (
    <div className="Miner">
      <Counter value={ resource } max={ resourceMax } />
      <Button  text={"Get "+type} hoverText={ getCost(type) } onClick={()=>addResource(type, 1)} />
      <LoadBar progress={ resource } totalProgress={resourceMax} color={color} />
      <MaxButton type={type} />  
    </div>
  );
}