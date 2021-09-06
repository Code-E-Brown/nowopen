import LogoutButton from '../../auth/LogoutButton'
import styles from '../../NavBar/NavBar.module.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dropdown() {
    // console.log(user)
    const user = useSelector(state => state.session.user);

    // console.log(user)
    return (
        <div className={styles.dropDown}>
            <div className={styles.innerDiv}>
                <div className={styles.fancy}>{user?.username}</div>

                <div className={styles.innerDiv2}>


                    <div>
                        <button className={styles.addBusiness}>
                            <Link to='/businesses/create'>
                                Add a Business
                            </Link>
                        </button>
                    </div>
                    <div className={styles.logoutButton} >
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div >
    )


}

export default Dropdown
