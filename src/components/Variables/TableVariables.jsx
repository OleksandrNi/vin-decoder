import React from 'react';
import { Link } from 'react-router-dom';

export const TableVariables = ({ variables }) => {

  return (
    <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>GroupName</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {variables?.Results && variables.Results.map(item =>(
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.GroupName}</td>
              <td><Link to={`/variables/${item.ID}`}>{item.Name}</Link></td>
              <td>{item.Description.replace(/<\/?[^>]+(>|$)/g, '')}</td>
            </tr>
          ))}
        </tbody>
    </table>
  )
};
