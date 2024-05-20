import React, {useState, useEffect, useRef} from 'react';

import { useHover } from 'usehooks-ts';
import { useHoverText } from '../hooks/useHoverText.js'


export default function Button ({text, disabled, hoverText, onClick }) {

  const setHoverText = useHoverText((state) => state.setText);

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)
  
  if (isHover)
    setHoverText(hoverText);


  return (
      <div className='Button'>
        <button ref={hoverRef} disabled={disabled} onClick={onClick} >
          {text}
        </button>
        <br/>
      </div>
  );
}