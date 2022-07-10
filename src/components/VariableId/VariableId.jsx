import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDescription } from '../api/api';
import { TableVariableId } from './TableVariableId';
import Loader from '../Loader/Loader';


export const VariableId = () => {
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { variablesId } = useParams();
  
  useEffect(() => {
    setIsLoading(true);
    const description = async () => {
      const data = await getDescription(variablesId);
      setDescription(data);
      setIsLoading(false);
    };
    description();
  }, [variablesId]);
  
  return (
    <div>
      <h1>Description</h1>
      {isLoading 
        ? <Loader /> 
        : <div>
          {description?.Count !== 0
          ? <TableVariableId description={description} />
          : 'no info'
          }

        </div>
      }
    </div>
  )
};
