
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton'
import styles from './NavBar.module.css'
import { AiOutlineUser } from 'react-icons/ai'
import DropDownProfileButton from './Dropdown/DropDownProfileButton'
import Searchbar from './Searchbar';

// import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user);
  

  return (
    <nav className={styles.navContainer}>
      {/* <ul>
        <li> */}
      <div className={styles.navButtonLinkBox}>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      <Searchbar />
      <div className={styles.navButtonLinkBox}>
        {!user &&
          <>
            <div className={styles.loginButton}>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </div>
            {/* </div> */}
            {/* </li>
        <li> */}
            <div className={styles.signupButton}>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          </>
        }
        {/* </li>
        <li> */}
        {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
        {/* </li>
        <li> */}
        {/* <div className={styles.avatarCircle}>
        </div> */}
        {user &&
          <div>
            <DropDownProfileButton styles={styles} />
            {/* <LogoutButton /> */}

          </div>
          // <>
          //   <div>
          //     <AiOutlineUser styles={styles} className={styles.avatarCircle} />
          //   </div>

          //   <div>
          //   </div>
          // </>
        }
      </div>
      {/* </li>
      </ul> */}
    </nav >

  );
}

export default NavBar;
