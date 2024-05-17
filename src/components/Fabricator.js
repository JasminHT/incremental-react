import React, {useContext} from 'react';

//import useLocalStorage from '../hooks/useLocalStorage.js';
import useInterval from '../hooks/useInterval.js';
import { useLocalStorage } from 'usehooks-ts'

import { useResource, useResourceMax }  from '../hooks/useGameState.js';

import Button from './Button.js';
import Counter from './Counter.js';
import LoadBar from './LoadBar.js';

import cost from '../model/cost.js';
import {ResourceContext} from './ButtonBank.js';


export default function Fabricator( {type, label, color} ) {

  const [resource, addResource] = useResource(type);
  const [resourceMax, addResourceMax] = useResourceMax(type);

  const costCount = cost(type).count;
  const costType = cost(type).res;
  const [costResource, addCostResource] = useResource(costType);

  const [progress, setProgress, removeProgress] = useLocalStorage(type+'_progress', 0);
  const [isBuilding, setBuilding, removeBuilding] = useLocalStorage(type+'_building', false);



  const totalProgress = 100;

  function buttonDisabled() {
    return  costResource < costCount || 
            isBuilding || 
            resource >= resourceMax; //ugly
  }

  function start() {
    //ugly
    if (resourceMax >= resource + 1) {
      addCostResource(-costCount);
      setBuilding( true );
    }
  }

  function complete() {
    setProgress( 0 ); 
    addResource(1);
    setBuilding( false );
  }

 
  useInterval(step, isBuilding ? 20 : null);
  function step() { 

    if (progress >= totalProgress) {
      complete();
    }

    else {
      setProgress( progress+1 );
    }
  }

  return (
    <div className='fabricator'>
      <Counter value={resource} max={resourceMax} />
      <Button text={label} disabled={buttonDisabled()} onClick={start} />
      <LoadBar progress={progress} totalProgress={totalProgress} color={color}  />
      <Button text={"Increase max"} disabled={false} onClick={()=>addResourceMax(1)} />
    </div>
)}