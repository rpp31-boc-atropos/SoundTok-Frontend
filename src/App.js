import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Studio from './pages/Studio';
import { useAuth } from './contexts/AuthContext';



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
      </div>
    </Router>
  );
}

export default App;
