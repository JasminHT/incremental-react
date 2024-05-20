import React, {useContext, useRef} from 'react';

import { useResourceMax, useCost }  from '../hooks/useGameState.js';

import Button from './Button.js';

export default function MaxButton( {type} ) {

  const [getMaxCost, payMaxCost, affordMaxCost] = useCost(type, "max_increase");
  const [resourceMax, addResourceMax] = useResourceMax(type);
  
  function buttonDisabled() {
    if (!affordMaxCost()) 
      return true;
    return false;
  }

  function increaseMax() {
    payMaxCost()
    addResourceMax(10)
  }

  return (
    <div className="IncreaseMax Button">
      <Button text={"Increase max"} disabled={buttonDisabled()} hoverText={ getMaxCost() }  onClick={()=>increaseMax()} />  
    </div>
  );
}