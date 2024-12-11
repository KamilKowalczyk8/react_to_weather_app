import {createSlice, configureStore} from '@reduxjs/toolkit';
import '../App.css';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        unit: localStorage.getItem('unit') || 'metric',
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const city = action.payload;
            if (state.favorites.includes(city)) {
                state.favorites = state.favorites.filter(fav => fav !== city);
            } else {
                state.favorites.push(city);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        setUnit: (state, action) => {
            state.unit = action.payload;
            localStorage.setItem('unit', state.unit);
        },
    },
});

export const {toggleFavorite, setUnit} = appSlice.actions;
export const store = configureStore({reducer: appSlice.reducer});
