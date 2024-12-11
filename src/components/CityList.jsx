import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../redux/appSlice';
import '../App.css';

const CityList = ({cities}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const favorites = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <div className="city-buttons">
                {filteredCities.map(city => (
                    <div key={city.id} className="city-button-container">
                        <Link to={`/city/${city.name}`} className="city-button">
                            <span className="city-icon">🏙️</span>
                            {city.name}
                        </Link>
                        <button
                            onClick={() => dispatch(toggleFavorite(city.name))}
                            className="favorite-button"
                        >
                            {favorites.includes(city.name) ? '★' : '☆'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CityList;
