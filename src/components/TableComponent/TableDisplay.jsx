import React from 'react';
import { Link } from 'react-router-dom';
import './TableDisplay.scss'

export const TableDisplay = ({ columns, results, columnWithLink }) => {

  return (
    <table className='table container'>
        <thead>
          <tr>
            {columns.map(item => <th key={item}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {results.map(item =>(
            <tr key={item}>
              {columns.map(column => {
                if (column === columnWithLink) {
                  return <th><Link to={`/variables/${item.ID}`}>{item[column]}</Link></th>
                }
                return <th>{item[column]}</th>
              })}
            </tr>
          ))}
        </tbody>
    </table>
  )
};
