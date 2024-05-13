import React, {useState, useEffect} from 'react';


function MemoryButton (props) {

  return (
      <div>
        <label>{props.value} </label>
        <button disabled={props.disabled} onClick={props.onClick} >
          {props.label}
        </button>
        <br/>
      </div>
  );
};
export default MemoryButton;