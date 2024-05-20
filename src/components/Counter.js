import React, {useState, useEffect} from 'react';


export default function Button ({value, max}) {

  return (
        <div className='Counter'>
          {value}/{max} 
        </div>
        );
}