import { useState } from 'react';
import { useEffect } from 'react';
import { getVariables } from '../api/api';
import Loader from '../Loader/Loader';
import { TableVariables } from './TableVariables';


export const Variables = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [variables, setVariables] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const variables = async () => {
      const data = await getVariables();
      setVariables(data);
      setIsLoading(false);
    };
    variables();
  }, []);

  return (
    <div>
      <h1>Variables</h1>

      {isLoading 
        ? <Loader /> 
        : <div>
          <TableVariables variables={variables} />
        </div>
      }
    </div>
  )
};
