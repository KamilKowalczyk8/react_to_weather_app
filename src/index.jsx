import React from 'react';
import ReactDOM from 'react-dom/client'; // Importuj createRoot
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {store} from './redux/appSlice';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Utwórz root

root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
