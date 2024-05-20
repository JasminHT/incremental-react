import React, {useContext, useRef} from 'react';

import { useHoverText, useGetHoverText } from '../hooks/useHoverText.js'

export default function Miner( {type, color} ) {

  const {hoverText, setText} = useHoverText();

  return (
    <div className="Hint">
      <p>{hoverText}</p>
    </div>
  );
}