import React, {useState, useEffect} from 'react';
import useInterval from './useInterval.js';
import useLocalStorage from './useLocalStorage.js';

export default function LoadBar(props) {

  let fill = 200*props.progress/props.total;

  return (
    <div className='loadBar'>
      <div className='progress' style={{'backgroundColor': props.color, width: fill+"px"}}>
      </div>
    </div>
  );

}
