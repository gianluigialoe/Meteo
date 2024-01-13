import React, { useState, useEffect } from 'react';

const chiaveApi = 'fe652f4e9313e20c338225e68e738fa8';
const KELVIN_TO_CELSIUS = 273.15;

const WeatherComponent = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${chiaveApi}`);

        if (!response.ok) {
          throw new Error('Errore nella chiamata API');
        }

        const data = await response.json();
        setWeatherData(data);
        console.log('Risposta API:', data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati meteorologici:', error.message);
        alert('Si è verificato un errore durante il recupero dei dati meteorologici. Riprova con un altra città.');
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Informazioni Meteorologiche</h2>
      {weatherData ? (
        <div id="weatherCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`https://source.unsplash.com/800x400/?${cityName}`}
                className="d-block w-100"
                alt={weatherData.weather[0].description}
              />
            </div>
          </div>
          <div className="carousel-caption">
            <h5>Città: {weatherData.name}</h5>
            {weatherData.main && (
              <div>
                <p>Temperatura max: {(weatherData.main.temp_max - KELVIN_TO_CELSIUS).toFixed(2)}°C</p>
                <p>Temperatura min: {(weatherData.main.temp_min - KELVIN_TO_CELSIUS).toFixed(2)}°C</p>
              </div>
            )}
            {weatherData.weather && weatherData.weather[0] && (
              <p>Condizioni: {weatherData.weather[0].description}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center">Caricamento...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
