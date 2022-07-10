import React from 'react';

export const TableFindVehicle = ({ vehicle }) => {

  return (
    <table className='table'>
        <thead>
            <tr>
                <th>VariableId</th>
                <th>Variable</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            { vehicle.Results.map(item =>(
                (item.Value && item.Value !== 'Not Applicable') &&
                <tr key={item.VariableId}>
                  <td>{item.VariableId}</td>
                  <td>{item.Variable}</td>
                  <td>{item.Value}</td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}
