import React, {useState, useEffect} from 'react'

import useLocalStorage from '../hooks/useLocalStorage.js'

import Button from './Button.js'
import Fabricator from './Fabricator.js'

import {initialResources} from '../model/state.js';


export default function ButtonBank () {

  const [resources, setResources] = useLocalStorage("resources", initialResources)


  function reset() { 
    setResources(initialResources);
  }

  const get = (type) => (
    () => setResources({...resources, [type]: resources[type]+1 })
  )

  return (
    <>
      <Button label="Reset" onClick={reset} />

      <Button label="Collect Food" value={resources.food} onClick={get('food')} />
      <Button label="Cut Wood" value={resources.wood} onClick={get('wood')} />
      <Button label="Mine Stone" value={resources.stone} onClick={get('stone')} />

      <Fabricator label='Grow a Farm' type='farm' color='green' resources={resources} setResources={setResources}/>
      <Fabricator label='Build a House' type='house' color='brown' resources={resources} setResources={setResources}/>
      <Fabricator label='Build a Wall' type='wall' color='red' resources={resources} setResources={setResources}/> 

    </>
  );
};


