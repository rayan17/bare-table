import React from 'react';

export default function ({columns, data}) {
  
  const handleHeadClick = (event) => {
    console.log('1', event);
  }
  
  return (
    <table className="table" cellPadding={0} cellSpacing={0}>
      <thead className="thead">
      <tr>
        {columns.map( (column, index) => <td key={'th_'+index}onClick={ (event) => handleHeadClick(event)}>{column.label}</td>)}
      </tr>
      </thead>
      <tbody className="tbody">
      {data.map((row, index) => 
        <tr key={'tr_'+index}>
          {columns.map( (column, index) => <td key={'cell_'+index}>{row[column.name]}</td>)}
        </tr>)}
      </tbody>
    </table>
  )
}