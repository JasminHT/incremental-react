import React, {useState, useEffect, createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

import Button from './Button.js'
import Fabricator from './Fabricator.js'

import {initialResources} from '../model/state.js';


export default function ButtonBank () {

  const [resources, setResources] = useLocalStorage("resources", initialResources);
  const ResourceContext = React.createContext();

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

      <ResourceContext.Provider value={[resources, setResources]}>
        <Fabricator label='Grow a Farm' type='farm' color='green' />
        <Fabricator label='Build a House' type='house' color='brown' />
        <Fabricator label='Build a Wall' type='wall' color='red' /> 
      </ResourceContext.Provider>
    </>
  );
};


