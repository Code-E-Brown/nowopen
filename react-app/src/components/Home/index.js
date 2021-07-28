
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Home.module.css'
import Searchbar from '../NavBar/Searchbar';
import DropDownProfileButton from '../NavBar/Dropdown/DropDownProfileButton'




const Home = () => {

    const user = useSelector(state => state.session.user);

    return (
        <div className={styles.bannerDiv}>
            <div className={styles.flexbox}>
                <div className={styles.homeNavLinkBox}>
                    <div className={styles.navBox}>
                        <div className={styles.navLinksLeft}>
                            <Link to='/food' exact={true} activeClassName='active'>
                                Food
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>
                            <Link to='/food' exact={true} activeClassName='active'>
                                Retail
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>

                            <Link to='/food' exact={true} activeClassName='active'>
                                Events
                            </Link>
                        </div>
                    </div>
                    <div className={styles.navBox}>
                        {user ? (
                            <DropDownProfileButton />
                        ) :
                            <>
                                <div className={styles.loginButton}>
                                    <Link to='/login' exact={true} activeClassName='active'>
                                        Login
                                    </Link>
                                </div>
                                <div className={styles.signupButton}>
                                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                                        Sign Up
                                    </NavLink>
                                </div>
                            </>
                        }

                    </div>
                </div>
                <div className={styles.flexbox}>


                    <h1 className={styles.logoText}>Now Open</h1>

                    <Searchbar />
                </div>
                <div className={styles.blockBottom}>
                    <div style={{ height: '38px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default Home;
