import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavBar = () => {

  const { user, setUser, login, setLogin } = useAuth();

  return (
    <div>
      <h1>SoundTok</h1>
      <ul className='nav'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/studio'>Studio</Link>
        </li>
        <li>
          <Link to='/profile'>Profile(login required)</Link>
        </li>
        <li>User: {user}</li>

        <button onClick={() => {
          setLogin(!login);
          user === 'visitor' ? setUser('Registered user') : setUser('visitor');
        }}>{login ? 'log out' : 'login'}</button>

      </ul>

    </div >
  );
};

export default NavBar;
