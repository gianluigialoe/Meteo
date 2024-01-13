

import React, { useState } from 'react';
import FormComponent from './components/form';
import WeatherComponent from './components/fetch';
import "bootstrap/dist/css/bootstrap.min.css";
import Previsioni from './components/previsioni';
import  Image1  from '../src/assets/C483CC32-2190-4B99-9878-FFF6826A4E85.jpeg';


const App = () => {
  const [cityName, setCityName] = useState('');
  const chiaveApi = 'fe652f4e9313e20c338225e68e738fa8';

  const imageUrl1 = Image1;


  const handleFormSubmit = (value) => {
    console.log('Valore inserito:', value);
    setCityName(value);
  };

  return (
    <div>
      <h1 className='text-center bg-dark text-white'>App Meteo</h1>

      <FormComponent onFormSubmit={handleFormSubmit} />
      <WeatherComponent cityName={cityName} />
      <Previsioni cityName={cityName} apiKey={chiaveApi} imageUrl={imageUrl1} />
      <image1 src />
      
    </div>
  );
};

export default App;




