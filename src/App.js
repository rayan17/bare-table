import React, { useState, useEffect } from 'react'
import './App.css';

import VirtualTable from './components/virtualizedTable';
import generateColumns from './utils/index';
import faker from "faker";

function App() {
  const [data, setData] = React.useState([]);

  const generator = (flag, len) => {
    return new Array(len).fill(true).map(() => ({
      name: flag ? faker.name.findName() : '',
      description: flag ? faker.name.jobTitle() : '',
      location: flag ? faker.address.city() : ''
    }));
  }
  const [ list, setList] = React.useState( generator(false, 10));

  const updateData = (data) => {
    // list.splice( i, i + 10, ...data)
    setList(list);
  }
  React.useEffect( () => {
    // setTimeout( () => {
      // while( list.length <= 100 ) {        
        fetch('https://run.mocky.io/v3/b65cfe64-51f1-471a-a2dd-acf408b85331')
        .then(response => response.json())
        .then(json => setList(list))
      // }
    // }, 100);
    console.log('List', list);
  }, []);
  const loadData = () => {
    
  }
  const [columns, setColumns] = React.useState(generateColumns(30));

  return (
    <div>
      <VirtualTable list={list} loadData={loadData}/>
    </div>
  )
}

export default App;
