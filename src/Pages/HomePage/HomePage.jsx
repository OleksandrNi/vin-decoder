import React, { useCallback, useState, useEffect, } from 'react';
import { getVehicle } from '../../api';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { TableDisplay } from '../../components/TableComponent/TableDisplay';
import { queryLengts, regexValidate, storyMaxLenght } from '../../constants'
import Loader from '../../components/Loader/Loader';

const columns = ['VariableId', 'Variable', 'Value'];

export const FindVehicle = () => {
  const [query, setQuery] = useState('');
  const [vehicle, setVehicle] = useState(null);
  const [vehicles, setVehicles] = useState(JSON.parse(localStorage.getItem('vehicles')) || []);
  const [queryError, setQueryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredVehicle, setFilteredVehicle] = useState([]);

  useEffect(() => {
    if (vehicles.length > 0) {
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
    }
  }, [vehicles]);
    
  const onSearchVin = useCallback( async () => {
    if (query.length !== queryLengts || (regexValidate.test(query))) {
      setQueryError('Check the input, the VIN code consists of 17 characters (only numbers and letters)!');
      setVehicle('');
    } else {
      setIsLoading(true);
      const searchResult = await getVehicle(query);

      if (searchResult.Results[1].Value === '0') {
        setVehicle(searchResult);
        setQueryError('');
      } else {
        setQueryError('Some thing wrong! Error code: ' + searchResult.Results[4].Value);
        setQuery('');
        setVehicle('');
      };
      setIsLoading(false);
    };
  }, [query]);

  const addVehicle = useCallback((newVehicle) => {
    if (!vehicles.some(vehicle => vehicle.SearchCriteria === newVehicle.SearchCriteria)) {
      if(vehicles.length >= storyMaxLenght) {
        vehicles.shift();
      }
      setVehicles([...vehicles, newVehicle]);
    }
  }, [vehicles]);

  useEffect(() => {
    if (!queryError && vehicle) {
      addVehicle(vehicle);
      setVehicle(vehicle);
      setQuery('');
    }
  }, [addVehicle, queryError, vehicle]);

  useEffect(() => {
    if (vehicle?.Results) {
      const preparedVehicle = vehicle.Results.filter(item => item.Value && item.Value !== 'Not Applicable');
      setFilteredVehicle(preparedVehicle);
    } else {
      setFilteredVehicle([]);
    }
  }, [vehicle]);

  return (
    <>
      {isLoading 
        ? <Loader /> 
        : <SearchForm
          vehicles={vehicles}
          vehicle={vehicle}
          queryError={queryError}
          setQuery={setQuery}
          onSearchVin={onSearchVin}
        />
      }
      {(!!filteredVehicle.length) && (
        <TableDisplay columns={columns} results={filteredVehicle}/>
      )}
    </>
  )
}
