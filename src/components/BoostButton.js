import React, {useContext, useRef} from 'react';

import { useCost }  from '../hooks/useGameState.js';

import Button from './Button.js';

export default function BoostButton( {type, progress, setProgress} ) {

  const [getBoostCost, payBoostCost, affordBoostCost] = useCost("boost");

  function buttonDisabled() {
    if (!affordBoostCost(type)) return true;
    return false;
  }

  function boost() {
    payBoostCost(type);
    setProgress( progress + 20 );
  }

  return (
    <div className="BoostButton Button">
      <Button text={"Boost"} disabled={buttonDisabled()} hoverText={getBoostCost(type)} onClick={boost} />  
    </div>
  );
}