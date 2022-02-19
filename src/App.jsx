import './App.css';
import * as React from 'react';
import axios from 'axios';
import { HashRouter, BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/nav/NavBar.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import Studio from './pages/Studio.jsx';
import Hashtag from './pages/Hashtag.jsx';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import Auth0ProviderWithHistory from './components/authentication/Auth0.jsx';
import { useAuth0 } from '@auth0/auth0-react';
import { UserInfoContext } from './contexts/UserContext.jsx';

//add new route above NotFound Route

//add * to the path if you need to create nested routes

//log in to view/edit profile, otherwise the profile will be redirected to the homepage

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const [ userInfo, setUserInfo ] = React.useState({});

  // QUERY FOR USER PROPIC AND USERNAME HERE USING EMAIL
  React.useEffect(() => {
    /* USER OBJECT PROPERTIES (i.e. user.email)
    email: "juliemyu@gmail.com"
    email_verified: true
    family_name: "Yu"
    given_name: "Julie"
    locale: "en"
    name: "Julie Yu"
    nickname: "juliemyu"
    picture: "https://lh3.googleusercontent.com/a-/AOh14GiDG3BTanmO3ioJmG7tQrm5IC7lv1LhCtljtcnzXaI=s96-c"
    sub: "google-oauth2|113407150088693247128"
    updated_at: "2022-02-19T02:14:17.669Z"
    */

    if (isAuthenticated) {
      const email = user.email;
      // backend get request using email as a key. we want profile picture, bio, username
    }
  }, [isAuthenticated]);

  const callApi = () => {
    axios.get('/public')
      .then(response => console.log(response.date))
      .catch(error => console.log(error));
  };

  return (
    <HashRouter>
      <Auth0ProviderWithHistory>
        <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
          <div className='App'>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              {/* <Route path='/profile/*' element={isAuthenticated ? <Profile /> : <Navigate to='/' />} /> */}
              <Route path="/profile/*" element={<Profile />} />
              <Route path='/studio/*' element={<Studio />} />
              <Route path="/hashtag" element={<Hashtag />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <AudioPlayer />
          </div>
        </UserInfoContext.Provider>
      </Auth0ProviderWithHistory>
    </HashRouter>
  );
};

export default App;
