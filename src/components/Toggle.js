import React, { useState } from 'react';

export default function Toggle({ onToggle, initialChecked = false }) {

  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <div
      className={`Toggle ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}
      style={{
        display: 'inline-block',
        height: '20px',
        border: '1px solid black',
        borderRadius: '4px',
        backgroundColor: isChecked ? 'green' : 'white',
        cursor: 'pointer',
        textAlign: 'center',
        lineHeight: '20px',
        userSelect: 'none',
      }}
    >
      {isChecked ? 'Auto' : 'Auto'}
    </div>
  );
}
