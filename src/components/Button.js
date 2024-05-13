import React, {useState, useEffect} from 'react';


export default function Button ({label, value, disabled, onClick }) {

  return (
      <div>
        <label>{value} </label>
        <button disabled={disabled} onClick={onClick} >
          {label}
        </button>
        <br/>
      </div>
  );
};