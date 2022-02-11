import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import { AuthProvider } from './contexts/AuthContext.jsx';
import { PlayerProvider } from './contexts/player/playerContext';


ReactDOM.render(
  <PlayerProvider>
    <App />
  </PlayerProvider>,
  document.getElementById('root'));




