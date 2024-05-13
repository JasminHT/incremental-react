import React, {useState, useEffect} from 'react'

import useLocalStorage from '../hooks/useLocalStorage.js'
import useInterval from '../hooks/useInterval.js'

import Button from './Button.js'
import LoadBar from './LoadBar.js'


export default function Fabricator( {type, label, color, resources, setResources} ) {

  const [progress, setProgress] = useLocalStorage(type+'_progress', 0);
  const [isBuilding, setBuilding] = useLocalStorage(type+'_building', false);

  const totalProgress = 100;

  const cost = {
    farm: {res: 'wood', count: 10},
    house: {res: 'wood', count: 20},
    wall: {res: 'stone', count: 10}
  }

  function buttonDisabled() {
    return resources[cost[type].res] < cost[type].count || isBuilding;
  }

  function start() {
      setResources( (res) => ({...res, [cost[type].res]: res[cost[type].res]-cost[type].count})  );
      setBuilding( true );
  }

  function complete() {
    setResources( (res) => ({...res, [type]: res[type]+1})  );
  }


 
  useInterval(step, isBuilding ? 20 : null);
  function step() { 

    if (progress >= totalProgress) {
      setProgress( 0 ); 
      setBuilding( false );
      complete();
    }

    else {
      setProgress( progress+1 );
    }
  }

  return (
    <>
      <Button 
        label={label} 
        disabled={buttonDisabled()} 
        value={resources[type]} 
        onClick={start} />

      <LoadBar 
        progress={progress}
        totalProgress={totalProgress}
        color={color}  />
    </>
)}