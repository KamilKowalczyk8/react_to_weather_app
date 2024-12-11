import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import CityList from './components/CityList';
import WeatherDetails from './components/WeatherDetails';
import {BrowserRouter} from 'react-router-dom'; // Importuj BrowserRouter
import './App.css';

const App = () => {
    const [cities] = useState([
        {name: 'New York', id: 1},
        {name: 'London', id: 2},
        {name: 'Paris', id: 3},
        {name: 'Berlin', id: 4},
        {name: 'Tokyo', id: 5},
        {name: 'Sydney', id: 6},
        {name: 'Moscow', id: 7},
        {name: 'Beijing', id: 8},
        {name: 'Mumbai', id: 9},
        {name: 'Los Angeles', id: 10},
    ]);

    return (
        <div className="app">
            <BrowserRouter>
                {' '}
                {/* Owinąć cały komponent w BrowserRouter */}
                <Routes>
                    <Route path="/" element={<CityList cities={cities} />} />
                    <Route
                        path="/city/:cityName"
                        element={<WeatherDetails />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
