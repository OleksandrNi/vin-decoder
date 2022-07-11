import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDescription } from '../../api';
import { TableDisplay } from '../../components/TableComponent/TableDisplay';
import Loader from '../../components/Loader/Loader';

const columns = ['Id', 'ElementName', 'Name'];

export const VariableId = () => {
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { variablesId } = useParams();

  const loadDescription = async () => {
    const data = await getDescription(variablesId);
    setDescription(data);
    setIsLoading(false);
  };
  
  useEffect(() => {
    setIsLoading(true);
    loadDescription();
  }, []);

  return (
    <div>
      <h1>Description</h1>
      {isLoading 
        ? <Loader /> 
        : <div>
          {description?.Count !== 0 && description?.Results
          ? <TableDisplay columns={columns} results={description.Results}/>
          : 'No additional information about this Variable!'
          }

        </div>
      } 
    </div>
  )
};
