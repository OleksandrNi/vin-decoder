import React from 'react';
import './SearchForm.scss'

export const SearchForm = ({ vehicles, vehicle, queryError, setQuery, onSearchVin }) => {
  
  return (
    <form className='vehicle' onSubmit={(event) => {event.preventDefault()}}>
      <div className='vehicle__label'>
        <label className='vehicle__label-title' htmlFor='vin-input'>
          Enter 17 chars of Your VIN code
        </label>
        
        <div className='vehicle__form'>
          <input 
            list='input-vin' 
            id='vin-input' 
            name='vin-input'
            className='vehicle__form-input'
            autoComplete='off'
            placeholder='Enter Your VIN here'
            onChange={(e) => {setQuery(e.target.value.toUpperCase())}}
          />
          <datalist id='input-vin' className='vehicle__form-datalist'>
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
  )
}
