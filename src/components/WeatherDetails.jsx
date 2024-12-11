import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {setUnit} from '../redux/appSlice';
import '../App_weather.css';

const WeatherDetails = () => {
    const {cityName} = useParams();
    const navigate = useNavigate();
    const [weatherData, setWeatherData] = useState(null);
    const unit = useSelector(state => state.unit);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=fd11791fc5e4fd49d121344ca5004c8c&units=${unit}`,
            );
            const data = await response.json();

            const forecast = data.list.slice(0, 5).map(item => ({
                date: new Date(item.dt * 1000).toLocaleDateString(),
                temperature: item.main.temp,
                conditions: item.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                precipitation: item.pop * 100,
                rain: item.rain ? item.rain['3h'] || 0 : 0,
                windSpeed: item.wind.speed,
                windDirection: item.wind.deg,
                cloudiness: item.clouds.all,
            }));

            setWeatherData({
                city: cityName,
                temperature: data.list[0].main.temp,
                conditions: data.list[0].weather[0].description,
                forecast,
            });
        };

        fetchWeather();
    }, [cityName, unit]);

    if (!weatherData) return <div>Loading...</div>;

    return (
        <div>
            <div className="secondview">
                <button onClick={() => navigate(-1)} className="back-button">
                    Back
                </button>
                <h2>Weather in {weatherData.city}</h2>
                <p>
                    Current temperature: {weatherData.temperature}°{' '}
                    {unit === 'metric' ? 'C' : unit === 'imperial' ? 'F' : 'K'}
                </p>
                <p>Conditions: {weatherData.conditions}</p>
                <div className="search-bar-view">
                    <button onClick={() => dispatch(setUnit('metric'))}>
                        Celsius (°C)
                    </button>
                    <button onClick={() => dispatch(setUnit('imperial'))}>
                        Fahrenheit (°F)
                    </button>
                    <button onClick={() => dispatch(setUnit('standard'))}>
                        Kelvin (K)
                    </button>
                </div>
                <center>
                    <h3>5-day forecast:</h3>
                </center>
                <ul className="front-city-view">
                    {weatherData.forecast.map((day, index) => (
                        <li className="view" key={index}>
                            <img
                                src={day.icon}
                                alt={day.conditions}
                                className="weather-icon"
                            />
                            <br />
                            {day.date}: {day.temperature}°, {day.conditions}
                            <br />
                            <ul>
                                <li>
                                    Precipitation Probability:{' '}
                                    {day.precipitation}%
                                </li>
                                <li>Rainfall: {day.rain} mm</li>
                                <li>
                                    Wind: {day.windSpeed} m/s,{' '}
                                    {day.windDirection}°
                                </li>
                                <li>Cloudiness: {day.cloudiness}%</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WeatherDetails;
