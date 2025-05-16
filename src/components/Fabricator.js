import React, {useContext, useEffect} from 'react';

//import useLocalStorage from '../hooks/useLocalStorage.js';
import useInterval from '../hooks/useInterval.js';
import { useLocalStorage } from 'usehooks-ts'

import { useResource, useResourceMax, useCost, useWholeState }  from '../hooks/useGameState.js';

import Button from './Button.js';
import Counter from './Counter.js';
import LoadBar from './LoadBar.js';
import MaxButton from './MaxButton.js'
import BoostButton from './BoostButton.js'
import Toggle from './Toggle.js'

export default function Fabricator( {type, label, color} ) {

  const [resource, addResource] = useResource(type);
  const [resourceMax, addResourceMax] = useResourceMax(type);
  const [getCost, payCost, affordCost] = useCost(type);
  const [gameState] = useWholeState();

  const [progress, setProgress, removeProgress] = useLocalStorage(type+'_progress', 0);
  const [isBuilding, setBuilding, removeBuilding] = useLocalStorage(type+'_building', false);
  const [autoFabricate, setAutoFabricate] = useLocalStorage(type+'_auto', false);

  const totalProgress = 100;

  //Button becomes grayed out and cannot be clicked
  function buttonDisabled() {
    if (!affordCost()) return true;
    if (isBuilding) return true;
    if ( resource >= resourceMax ) return true;
    return false;
  }
  
  function start() {
    if (resourceMax >= resource + 1 && !isBuilding) {
      setBuilding( true );
      payCost();
    }
  }

  function complete() {
    //finish
    setProgress( 0 ); 
    addResource( 1 );
    setBuilding( false );
  }

  useInterval(step, isBuilding ? 20 : 20);
  function step() { 
    if (isBuilding) {
      if (progress >= totalProgress) 
        complete();
      else 
        setProgress( progress+1 );
    }
    if (autoFabricate && !buttonDisabled()) {
      start();
    }
  }


  return (
    <div className='Fabricator'>

      <Counter value={resource} max={resourceMax} />

      { (isBuilding) ? 
        
        <BoostButton type={type} progress={progress} setProgress={setProgress}/>
      :  //One or the
        <Button type={type}
          cost={getCost()} hoverColor={buttonDisabled() ? 'red':'black'} disabled={buttonDisabled()} 
          onClick={start} >
            {label}
          </Button>
      }
      
      <LoadBar progress={progress} 
        totalProgress={totalProgress} 
        color={color}  />

      <MaxButton type={type} /> 
      <Toggle onToggle={setAutoFabricate} initialChecked={autoFabricate}/> 
    </div>
  )




}