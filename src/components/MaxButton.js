import React, {useContext, useRef} from 'react';

import { useResourceMax, useCost }  from '../hooks/useGameState.js';

import Button from './Button.js';

export default function MaxButton( {type} ) {

  const [getMaxCost, payMaxCost, affordMaxCost] = useCost("max_increase");
  const [resourceMax, addResourceMax] = useResourceMax();
  
  function buttonDisabled() {
    if (!affordMaxCost(type)) 
      return true;
    return false;
  }

  function increaseMax() {
    payMaxCost(type)
    addResourceMax(type,10)
  }

  return (
    <div className="IncreaseMax Button">
      <Button text={"Increase max"} disabled={buttonDisabled()} hoverText={ getMaxCost(type) }  onClick={()=>increaseMax()} />  
    </div>
  );
}