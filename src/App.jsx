import React, { lazy, Suspense } from 'react';
import axios from 'axios';

import './App.css';

import { Routes, Route } from 'react-router-dom';
const NavBar = React.lazy(() => import('./components/nav/NavBar.jsx'));
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Profile = React.lazy(() => import('./pages/Profile.jsx'));
const Studio = React.lazy(() => import('./pages/Studio.jsx'));
const Hashtag = React.lazy(() => import('./pages/Hashtag.jsx'));
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import NotFound from './pages/NotFound.jsx';

//add new route above NotFound Route

//add * to the path if you need to create nested routes

//log in to view/edit profile, otherwise the profile will be redirected to the homepage

const App = () => {
  // refs
  const mainAudio = React.useRef(null);

  const callApi = () => {
    axios.get('/public');
    // .then(response => console.log(response.date))
    // .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home mainAudio={mainAudio} />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/studio/*" element={<Studio />} />
          <Route
            path="/hashtag"
            element={<Hashtag key={window.location.href} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <AudioPlayer mainAudio={mainAudio} />
      </Suspense>
    </div>
  );
};

export default App;
