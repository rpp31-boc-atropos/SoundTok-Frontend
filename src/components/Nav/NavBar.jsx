import React from 'react';
import Search from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

// const NavStyle = styled.div`
//   max-width: 850px;
//   height: 20px;
//   position: fixed;
//   border-color: var(--font-line-color-yellow-transparent)
// `;


const NavBar = () => {

  const {loginWithRedirect, logout, isLoading, user, getAccessTokenSilently, isAuthenticated} = useAuth0();

  console.log('isLoading', isLoading);
  // console.log('isAuthenticated,' isAuthenticated);
  console.log('user', user);
  console.log('isAuthenticated', isAuthenticated);

  const callPublicApi = () => {
    axios.get('/public')
      .then(response => console.log(response.data))
      .catch(error => console.log(error.message));
  };

  const callProtectedApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log('token', token)
      const response = await axios.get('/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log('front:', error);
    }


  };


  return (

    <ul className='nav'>
      <li className='logo'>
        <Link to='/'>SoundTok</Link>
      </li>
      <li>
        <Link to='/studio'>Studio</Link>
      </li>
      <li>
        <Link to='/profile'>Profile</Link>
      </li>
      <li>
        <button onClick={() => callPublicApi()}> Public API</button>
      </li>
      <li>
        <button onClick={() => callProtectedApi()}> Protected API</button>
      </li>

      <Search />
      {!isLoading && !user && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      {!isLoading && user && (
        <div style={{display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center'}}>
          <img src={user.picture} style={{ height: '30pt', borderRadius: '50%', paddingRight: '10px'}}/>
          <button onClick={() => logout()}>Log Out</button>
        </div>
      )}

    </ul>

  );
};

export default NavBar;
