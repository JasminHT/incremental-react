import React from 'react';

import { useHoverText } from '../hooks/useHoverText.js'

export default function Hint() {

  const {hoverText, setText} = useHoverText();

  return (
    <div className="Hint">
      <p>{hoverText}</p>
    </div>
  );
}