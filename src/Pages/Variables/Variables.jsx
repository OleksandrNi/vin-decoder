import { useState, useEffect } from 'react';
import { getVariables } from '../../api';
import { TableDisplay } from '../../components/TableComponent/TableDisplay';
import Loader from '../../components/Loader/Loader';

const columns = ['ID', 'GroupName', 'Name', 'Description'];

export const Variables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [variables, setVariables] = useState(null);
  const [preparedVariables, setPreparedVariables] = useState([])

  const loadVariables = async () => {
    const data = await getVariables();
    setVariables(data);
    setIsLoading(false);
  };

  useEffect( () => {
    setIsLoading(true);
    loadVariables();
  }, []);

  useEffect(() => {
    if (variables?.Results) {
      const newVariables = variables.Results.map(item => ({
        ...item,
         Description: item.Description.replace(/<\/?[^>]+(>|$)/g, ''),
        }))
      setPreparedVariables(newVariables);
    } else {
      setPreparedVariables([]);
    }
  }, [variables]);



  return (
    <div>
      <h1>Variables</h1>

      {isLoading 
        ? <Loader /> 
        : <div>
          {(variables?.Results) && (
          <TableDisplay columns={columns} results={preparedVariables} columnWithLink={'Name'}/>
          )}
        </div>
      }
    </div>
  )
};
