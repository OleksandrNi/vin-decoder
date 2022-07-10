import React from 'react';

export const TableVariableId = ({ description }) => {

  return (
    <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>ElementName</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {description?.Results && description.Results.map(item =>(
            <tr key={item.Id}>
              <td>{item.Id}</td>
              <td>{item.ElementName}</td>
              <td>{item.Name}</td>
            </tr>
          ))}
        </tbody>
    </table>
  )
};
