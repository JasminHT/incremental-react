import React from 'react';

import { useCost }  from '../hooks/useGameState.js';

import Button from './Button.js';

export default function BoostButton( {type, progress, setProgress} ) {

  const [getBoostCost, payBoostCost, affordBoostCost] = useCost(type, "boost");

  function buttonDisabled() {
    if (!affordBoostCost()) return true;
    return false;
  }

  function boost() {
    payBoostCost();
    setProgress( progress + 20 );
  }

  return (
    <div className="BoostButton Button">
      <Button disabled={buttonDisabled()} hoverCost={getBoostCost()} onClick={boost}>
        Boost
      </Button>  
    </div>
  );
}