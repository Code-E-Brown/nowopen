
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton'
import styles from './NavBar.module.css'
import { AiOutlineUser } from 'react-icons/ai'
import DropDownProfileButton from './Dropdown/DropDownProfileButton'
import Searchbar from './Searchbar';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import SearchContainer from './Searchbar/SearchBar';


// import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user);
  // console.log(user)

  return (
    <nav className={styles.navContainer}>
      {/* <ul>
        <li> */}
      <div className={styles.navButtonLinkBox}>
        <NavLink className={styles.homeDiv} to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      {/* <Searchbar /> */}
      <SearchContainer />
      <div className={styles.navButtonLinkBox}>
        {!user &&
          <>
            <div className={styles.loginButton}>
              <LoginFormModal />
            </div>
            {/* </div> */}
            {/* </li>
        <li> */}
            <div className={styles.signupButton}>
              <SignupFormModal />
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
