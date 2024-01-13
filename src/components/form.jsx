// FormComponent.js
import React, { useState } from 'react';

const FormComponent = ({ onFormSubmit }) => {
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e) => {
    // Utilizza una regex per consentire solo caratteri alfabetici e spazi
    const regex = /^[a-zA-Z\s]+$/;
    const inputValue = e.target.value;

    if (regex.test(inputValue) || inputValue === '') {
      setCityName(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(cityName);
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-3">
          <label htmlFor="cityInput" className="form-label fw-bold">
            Inserisci il nome della città:
          </label>
          <input
            type="text"
            className="form-control"
            id="cityInput"
            value={cityName}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Clicca
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
