import React, {useState, useEffect} from 'react';
import useInterval from '../hooks/useInterval.js';
import useLocalStorage from '../hooks/useLocalStorage.js';

export default function LoadBar({progress, totalProgress, color}) {

  let fill = 200*progress/totalProgress;

  return (
    <div className='loadBar'>
      <div className='progress' style={{'backgroundColor': color, width: fill+"px"}}>
      </div>
    </div>
  );

}
