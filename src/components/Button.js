import React, { useRef, useEffect } from 'react';

import { useHover } from 'usehooks-ts';
import { useHoverText } from '../hooks/useHoverText.js'


export default function Button ({disabled, hoverText, onClick, children}) {

  const {setHoverText, clearHoverText} = useHoverText();

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  const hoverColor = disabled ? "red":"black";
  
  //detecting mouse hovers and leaves
  useEffect(() => {
    if (isHover)
      setHoverText(hoverText, hoverColor);
    else
      clearHoverText();
  }, [isHover, hoverText] );

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