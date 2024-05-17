
import React, {useState, useEffect} from 'react';


export default function LoadBar({progress, totalProgress, color}) {

  let barlength = 200;
  let fill = barlength*progress/totalProgress;

  return (
    <div className='loadBar' style={{'width': barlength}} >
      <div className='progress' style={{'backgroundColor': color, width: fill+"px"}}>
      </div>
    </div>
  );

}
