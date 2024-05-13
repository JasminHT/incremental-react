import React, {useState, useEffect} from 'react'

import useLocalStorage from './useLocalStorage.js'
import useInterval from './useInterval.js'

import MemoryButton from './MemoryButton.js'
import LoadBar from './LoadBar.js'

import {initialResources, initialBuilding} from './state.js';


export default function ButtonBank () {

  const [resources, setResources] = useLocalStorage("resources", initialResources)
  const [building, setBuilding] = useLocalStorage("building", initialBuilding)


  function reset() { 
    setResources(initialResources);
    setBuilding(initialBuilding);
  }


  // Methods for the Resource Buttons
  function getFood() { 
    let food = resources.food+1;
    setResources({...resources, food })
  }
  function getWood() { 
    let wood = resources.wood+1 ;
    setResources({...resources, wood })
  }
  function getStone() { 
    let stone = resources.stone+1;
    setResources({...resources, stone })
  }


  const buttonDisabled = {
    farm: () => { return (resources.wood<10 || building.farm) },
    house: () => { return (resources.wood<10 || building.house) },
    wall: () => { return (resources.stone<10 || building.wall) }
  }


  const start = {
    farm: () =>  { 
      setResources({...resources, wood: resources.wood-10 })
      setBuilding({...building, farm: true })
    }, 
    house: () =>  { 
      setResources({...resources, wood: resources.wood-10 })
      setBuilding({...building, house: true })
    },
    wall: () => { 
      setResources({...resources, stone: resources.stone-10 })
      setBuilding({...building,  wall: true })
    },
  };


  const complete = {
    farm: () => { 
      setResources( res => res['farm'] = res['farm']+1 )
      setBuilding({...building, farm: false })
    },
    house: () => {
      setResources({...resources, house: resources.house+1 })
      setBuilding({...building, house: false })
    },
    wall: () => {
      setResources({...resources, wall: resources.wall+1 })
      setBuilding({...building, wall: false })
    },
  }

  function completessss(type) {

  }



  function FabricatorUnit(props) {

    const [progress, setProgress] = useLocalStorage(props.type+'_progress', 0);
    const total = 100;
   
    useInterval(step, building[props.type] ? 20:null);
    function step() { 

      if (progress >= total) {
        setProgress( 0 ); 
        setTimeout(complete[props.type], 5); //delay must be added to let it finish. BAD CODE 
      }

      else {
        setProgress( progress+1 );
      }
    }


    return (
      <>
        <MemoryButton 
          label={props.label} 
          disabled={buttonDisabled[props.type]()} 
          value={resources[props.type]} 
          onClick={start[props.type]} />

        <LoadBar 
          progress={progress}
          total={total}
          color={props.color}  />
      </>
  )}


  return (
    <>
      <MemoryButton label="Reset" onClick={reset} />

      <MemoryButton label="Collect Food" value={resources.food} onClick={getFood} />
      <MemoryButton label="Cut Wood" value={resources.wood} onClick={getWood} />
      <MemoryButton label="Mine Stone" value={resources.stone} onClick={getStone} />

      <FabricatorUnit label='Grow a Farm' type='farm' color='green'/>
      <FabricatorUnit label='Build a House' type='house' color='brown' />
      <FabricatorUnit label='Build a Wall' type='wall' color='red' /> 

    </>
  );
};


