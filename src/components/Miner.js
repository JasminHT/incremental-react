import React, {useContext} from 'react';

import { useResource, useResourceMax }  from '../hooks/useGameState.js';

import Button from './Button.js';
import Counter from './Counter.js';
import LoadBar from './LoadBar.js';

import cost from '../model/cost.js';



export default function Miner( {type, color} ) {


  const [resource, addResource] = useResource(type);
  const [resourceMax, addResourceMax] = useResourceMax(type);


  return (
    <div className="Miner">
      <Counter value={resource} max={resourceMax} />
      <Button text={"Get "+type} onClick={()=>addResource(1)} />
      <LoadBar progress={resource} totalProgress={resourceMax} color={color} />
      <Button text={"Increase max"} onClick={()=>addResourceMax(1)} />  
    </div>
  );
}