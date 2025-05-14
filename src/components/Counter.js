import React from 'react';
import LoadBar from './LoadBar.js';

export default function Button ({value, max}) {

  return (
        <>
          <div className='Counter'>
            {value}/{max} 
          </div>
          <LoadBar progress={value} totalProgress={max}  />
        </>
        );
}