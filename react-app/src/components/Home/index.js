
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Home.module.css'
import Searchbar from '../NavBar/Searchbar';




const Home = () => {
    return (
        <div className={styles.bannerDiv}>
            <div className={styles.flexbox}>
                <Searchbar />
            </div>
        </div>
    )
}

export default Home;
