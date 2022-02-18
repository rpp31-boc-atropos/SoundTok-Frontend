<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import 'dotenv/config';
>>>>>>> 96500208eed2957d8f8536824d90bc9c3986f041
// import { AuthProvider } from './contexts/AuthContext.jsx';
import { PlayerProvider } from "./contexts/player/playerContext";

ReactDOM.render(
  <PlayerProvider>
    <App />
  </PlayerProvider>,
  document.getElementById("root")
);
