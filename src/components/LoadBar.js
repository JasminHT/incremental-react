
import React from 'react';


export default function LoadBar({progress, totalProgress, color}) {

  let barlength = 100;
  let fill = barlength*progress/totalProgress;

  return (
    <div className='LoadBar' style={{'width': barlength}} >
      <div className='progress' style={{'backgroundColor': color, width: fill+"px"}}>
      </div>
    </div>
  );

}
