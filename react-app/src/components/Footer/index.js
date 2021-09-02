import styles from '../NavBar/NavBar.module.css'
import homeStyles from '../Home/Home.module.css'
import { AiOutlineGithub } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';


const Footer = () => {
    return (
        <nav className={styles.navContainer} style={{ "display": "flex", alignItems: "center" }}>
            {/* <ul>
            <li> */}
            <div className={styles.navButtonLinkBox} style={{ "display": "flex", "justifyContent": "center", alignItems: "center", fontWeight: "700" }}>
                A Pop-up & Mobile Business locator by:
                <a href="https://codybrown.dev/" target="_blank" rel="noopener noreferrer" className={styles.homeDiv} style={{}}>
                    Cody Brown
                </a>
                {/* <div className={homeStyles.blockBottom} style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                </div> */}
            </div>
            <div>

                <a className={homeStyles.aboutLinks} href='https://github.com/Code-E-Brown' target="_blank" rel="noopener noreferrer">
                    <AiOutlineGithub className={homeStyles.icon} style={{ backgroundColor: 'black', borderRadius: '50%' }} />
                </a>

                <a className={homeStyles.aboutLinks} href='https://www.linkedin.com/in/cody-brown-95b77b1aa/' target="_blank" rel="noopener noreferrer">

                    <FaLinkedin className={homeStyles.icon} style={{ backgroundColor: 'black' }} />
                </a>
            </div>

        </nav >

    );
}


export default Footer
