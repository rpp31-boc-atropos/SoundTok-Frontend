<<<<<<< HEAD
import "./App.css";
import React from "react";
import {
  HashRouter,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/Nav/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Studio from "./pages/Studio.jsx";
// import { useAuth } from './contexts/AuthContext.jsx';
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import Auth0ProviderWithHistory from "./components/Authentication/Auth0.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Hashtag from "./pages/Hashtag.jsx";
=======
import './App.css';
import * as React from 'react';
import { HashRouter, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Nav/NavBar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import Studio from './pages/Studio.jsx';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import Auth0ProviderWithHistory from './components/Authentication/Auth0.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import { UserInfoContext } from './contexts/UserContext.jsx';
>>>>>>> b6dfc69 (Mid implementation of global userInfo context)

//add new route above NotFound Route

//add * to the path if you need to create nested routes

//log in to view/edit profile, otherwise the profile will be redirected to the homepage

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [ userInfo, setUserInfo ] = React.useState({});

  console.log(isAuthenticated);

  // QUERY FOR USER PROPIC AND USERNAME HERE USING EMAIL
  React.useEffect(() => {
    console.log({user, isAuthenticated});

  }, [isAuthenticated]);

  const callApi = () => {
    axios.get('/public')
      .then(response => console.log(response.date))
      .catch(error => console.log(error))
  };

  return (
    <HashRouter>
      <Auth0ProviderWithHistory>
<<<<<<< HEAD
        <div className="App">
          <NavBar />
          <Routes>
            {/* <Fragment>
              <PlayerProvider> */}
            <Route path="/" element={<Home />} />
            {/* <Route path='/profile/*' element={isAuthenticated ? <Profile /> : <Navigate to='/' />} /> */}
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/studio/*" element={<Studio />} />
            <Route path="/hashtag" element={<Hashtag />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <AudioPlayer />
        </div>
=======
        <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
          <div className='App'>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile/*' element={isAuthenticated ? <Profile /> : <Navigate to='/' />} />
              <Route path='/profile/*' element={<Profile />} />
              <Route path='/studio/*' element={<Studio />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <AudioPlayer />
          </div>
        </UserInfoContext.Provider>
>>>>>>> b6dfc69 (Mid implementation of global userInfo context)
      </Auth0ProviderWithHistory>
    </HashRouter>
  );
};

export default App;
