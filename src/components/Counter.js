import React from 'react';


export default function Button ({value, max}) {

  return (
        <div className='Counter'>
          {value}/{max} 
        </div>
        );
}