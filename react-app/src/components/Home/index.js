
import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css'
import Searchbar from '../NavBar/Searchbar';
import DropDownProfileButton from '../NavBar/Dropdown/DropDownProfileButton'
import { getBusinesses } from '../../store/business';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchContainer from '../NavBar/Searchbar/SearchBar';
import { AiOutlineGithub } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';


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
                            <Link to='/businesses/food' exact='true'>
                                Food
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>
                            <Link to='/businesses/retail' exact='true'>
                                Retail
                            </Link>
                        </div>
                        <div className={styles.navLinksLeft}>

                            <Link to='/businesses/events' exact='true'>
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
                                    <LoginFormModal />
                                    {/* <Link to='/login' exact='true'>
                                        Login
                                    </Link> */}
                                </div>
                                <div className={styles.signupButton}>
                                    <SignupFormModal />
                                </div>
                            </>
                        }

                    </div>
                </div>
                <div className={styles.flexbox}>


                    <h1 className={styles.logoText}>Now Open</h1>

                    {/* <Searchbar /> */}
                    <SearchContainer />
                </div>
                <div className={styles.blockBottom}>
                    {/* <div></div> */}
                    A Pop-up & Mobile Business Locator by:
                    <div className={styles.theMostProlificAndIconicDevOfAllTime}>Cody Brown</div>
                    <div>
                        <a className={styles.aboutLinks} href='https://github.com/Code-E-Brown' target="_blank" rel="noopener noreferrer">
                            <AiOutlineGithub className={styles.icon} />
                        </a>

                        <a className={styles.aboutLinks} href='https://www.linkedin.com/in/cody-brown-95b77b1aa/' target="_blank" rel="noopener noreferrer">

                            <FaLinkedin className={styles.icon} />
                        </a>
                    </div>
                    <div style={{ height: '120px' }}></div>
                </div>

            </div>
        </div>
    )
}

export default Home;
