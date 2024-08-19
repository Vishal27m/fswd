import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles (if any)
import App from './App'; // The main App component
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
