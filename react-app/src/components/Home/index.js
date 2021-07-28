
import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css'
import Searchbar from '../NavBar/Searchbar';
import DropDownProfileButton from '../NavBar/Dropdown/DropDownProfileButton'
import { getBusinesses } from '../../store/business';



const Home = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user);
    useEffect(() => {

        dispatch(getBusinesses())

    }, [dispatch])

    return (
        <div className={styles.bannerDiv}>
            <div className={styles.flexbox}>
                <div className={styles.homeNavLinkBox}>
                    <div className={styles.navBox}>
                        <div className={styles.navLinksLeft}>
                            <Link to='/food' exact='true'>
                                Food
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>
                            <Link to='/food' exact='true'>
                                Retail
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>

                            <Link to='/food' exact='true'>
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
                                    <Link to='/login' exact='true'>
                                        Login
                                    </Link>
                                </div>
                                <div className={styles.signupButton}>
                                    <Link to='/sign-up' exact='true'>
                                        Sign Up
                                    </Link>
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
                    <div style={{ height: '120px' }}></div>
                </div>
            </div>
        </div>
    )
}

export default Home;
