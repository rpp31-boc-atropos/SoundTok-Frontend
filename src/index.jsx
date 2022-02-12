import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
// import { AuthProvider } from './contexts/AuthContext.jsx';
<<<<<<< HEAD
import { PlayerProvider } from "./contexts/player/playerContext";
=======
import { PlayerProvider } from './contexts/player/playerContext';
>>>>>>> 1fadfa7d9ed72a0e49af59abe1238cc91af1c3b9

ReactDOM.render(
  <PlayerProvider>
    <App />
  </PlayerProvider>,
<<<<<<< HEAD
  document.getElementById("root")
=======
  document.getElementById('root')
>>>>>>> 1fadfa7d9ed72a0e49af59abe1238cc91af1c3b9
);
