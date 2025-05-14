import React, { useRef, useEffect } from 'react';

import { useHover } from 'usehooks-ts';
import { useHoverCost } from '../hooks/useHoverCost.js'


export default function Button ({type, disabled, hoverCost, onClick, children}) {

  const {setHoverCost, clearHoverCost} = useHoverCost();

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const hoverColor = disabled ? "red":"black";
  
  //detecting mouse hovers and leaves
  useEffect(() => {
    if (isHover)
      setHoverCost(type, hoverCost, hoverColor);
    else
      clearHoverCost();
  }, [isHover, hoverCost] );

  //buttons can be disabled
  return (
      <div className='Button'>
        <button ref={hoverRef} disabled={disabled} onClick={onClick} >
          {children}
        </button>
        <br/>
      </div>
  );
}