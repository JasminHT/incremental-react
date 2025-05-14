import React from 'react';

import { useHoverText } from '../hooks/useHoverText.js'

export default function Hint() {

  const {hoverText, hoverColor} = useHoverText();

  return (
    <div className="Hint">
      <p style={{color:hoverColor}}>{hoverText}</p>
    </div>
  );
}