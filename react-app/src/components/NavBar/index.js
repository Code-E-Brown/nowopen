
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton'
import styles from './NavBar.module.css'
// import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      {/* <ul>
        <li> */}
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      {/* </li>
        <li> */}
      <div>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </div>
      {/* </li>
        <li> */}
      <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
      {/* </li>
        <li> */}
      <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div>
      {/* </li>
        <li> */}
      <div>
        <LogoutButton />
      </div>
      {/* </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
