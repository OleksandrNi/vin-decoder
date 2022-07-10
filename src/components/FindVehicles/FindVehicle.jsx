import React, { useCallback, useState, useEffect, } from 'react';
// import ReactHTMLDatalist from 'react-html-datalist';
import { getVehicle } from '../api/api';
import { TableFindVehicle } from './TableFindVehicle';
import Loader from '../Loader/Loader';
import './FindVehicle.scss'
// import DatalistInput from 'react-datalist-input';


export const FindVehicle = () => {
  const [query, setQuery] = useState('')
  const [vehicle, setVehicle] = useState(null);
  const [vehicles, setVehicles] = useState(JSON.parse(localStorage.getItem('vehicles')) || []);
  const [queryError, setQueryError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  
  const onSearchVin = useCallback( async () => {
    let regex = /[^A-Za-z0-9]+/;

    if (query.length !== 17 || (regex.test(query))) {
      setQueryError('Check the input, the VIN code consists of 17 characters (only numbers and letters)!');
      setVehicle('')
    }
    else {
      setIsLoading(true);
      const searchResult = await getVehicle(query);

      if (searchResult.Results[1].Value === '0') {
        setVehicle(searchResult);
        setQueryError('');
      } else {
        setQueryError('Some thing wrong! Error code: ' + searchResult.Results[4].Value);
        setQuery('');
        setVehicle('');
      }
      setIsLoading(false);
    };
  }, [query]);

  const addVehicle = useCallback((newVehicle) => {
    if (!vehicles.some(vehicle => vehicle.SearchCriteria === newVehicle.SearchCriteria)) {
      if(vehicles.length >= 5) {
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

  return (
    <>
      {isLoading 
        ? <Loader /> 
        : <>
          <form className='vehicle' onSubmit={(event) => {event.preventDefault()}}>
            <div className='vehicle__label'>
              <label className='vehicle__label-title'>
                Enter 17 chars of Your VIN code
              </label>
              
              <div className='vehicle__form'>
                <input 
                  list='input-vin' 
                  id='vin-input' 
                  name='vin-input'
                  className='vehicle__form-input'
                  input autoComplete='off'
                  placeholder='Enter Your VIN here'
                  onChange={(e) => {setQuery(e.target.value.toUpperCase())}}
                />
                <datalist id='input-vin'>
                  {vehicles.map(vehicle => <option value={vehicle.SearchCriteria.slice(4)} />)}
                </datalist>
              </div>
            </div>

            <div className='vehicle__submit'>
              <button
                type='button'
                className='vehicle__submit-button'
                onClick={onSearchVin}
                >
                Decode VIN
              </button>
            </div>

            <div className='vehicle__info'>
              {queryError && (
                <p className='vehicle__info-error'>
                  {queryError}
                </p>
              )}
              {vehicle && (
                <p className='vehicle__info-success'>
                  {vehicle.SearchCriteria}
                </p>
              )}
            </div>
          </form>

          {vehicle && (
            <TableFindVehicle vehicle={vehicle} />
          )}
        </>
      }
    </>
  )
}
