import React, { useRef, useEffect } from 'react';

import { useHover } from 'usehooks-ts';
import { useSetHoverText, useClearHoverText } from '../hooks/useHoverText.js'


export default function Button ({text, disabled, hoverText, onClick }) {

  const setHoverText = useSetHoverText();
  const clearHoverText = useClearHoverText();

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  
  //detecting mouse hovers and leaves
  useEffect(() => {
    if (isHover)
      setHoverText(hoverText);
    else
      clearHoverText();
  }, [isHover, hoverText] );

  //buttons can be disabled
  return (
      <div className='Button'>
        <button ref={hoverRef} disabled={disabled} onClick={onClick} >
          {text}
        </button>
        <br/>
      </div>
  );
}