import React, {useState, useEffect} from 'react';


export default function Button ({text, disabled, onClick }) {

  return (
      <div className='button'>
        <button disabled={disabled} onClick={onClick} >
          {text}
        </button>
        <br/>
      </div>
  );
}