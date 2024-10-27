import React from 'react';
import ReactDOM from 'react-dom/client';

import ApplicationRoot from './app';


import './index.css';

// Rendering the app using ReactDOM.createRoot (preferred in modern React)
const root_element = document.getElementById('root');
const root = ReactDOM.createRoot(root_element);

root.render(
    // Wrapping the application in `React.StrictMode` for identifying
    // potential issues in development.
    // `React.StrictMode` helps detect side effects and deprecated
    // patterns in the app.
    <React.StrictMode>
        {/* The `ApplicationRoot` component represents the main entry point of the app. */}
        <ApplicationRoot />
    </React.StrictMode>      
);
  