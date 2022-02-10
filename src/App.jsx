import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import Studio from './pages/Studio.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import AudioPlayer from './components/audioPlayer/AudioPlayer';



//add new route above NotFound Route

//add * to the path if you need to create nested routes

//log in to view/edit profile, otherwise the profile will be redirected to the homepage

// eslint-disable-next-line
function App() {

  const { login } = useAuth();

  return (
    <Router>
      <div className='App'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/*' element={login ? <Profile /> : <Navigate to='/' />} />
          <Route path='/studio/*' element={<Studio />} />

          <Route path='/*' element={<NotFound />} />
        </Routes>
        <AudioPlayer />
      </div>
    </Router>
  );
}

export default App;
