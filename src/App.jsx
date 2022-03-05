import * as React from "react";
import axios from "axios";

import "./App.css";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Studio from "./pages/Studio.jsx";
import Hashtag from "./pages/Hashtag.jsx";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import NotFound from "./pages/NotFound.jsx";

//add new route above NotFound Route

//add * to the path if you need to create nested routes

//log in to view/edit profile, otherwise the profile will be redirected to the homepage

const App = () => {
  const callApi = () => {
    axios.get("/public");
    // .then(response => console.log(response.date))
    // .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/profile/*' element={isAuthenticated ? <Profile /> : <Navigate to='/' />} /> */}
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/studio/*" element={<Studio />} />
        <Route
          path="/hashtag"
          element={<Hashtag key={window.location.href} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <AudioPlayer />
    </div>
  );
};

export default App;
