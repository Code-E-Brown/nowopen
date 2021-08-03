import LogoutButton from '../../auth/LogoutButton'
import styles from '../../NavBar/NavBar.module.css'
import { Link } from 'react-router-dom';

function Dropdown() {

    return (
        <div className={styles.dropDown}>
            <Link to='/businesses/create'>
                <button>
                    Add a Business
                </button>
            </Link>
            <LogoutButton />
        </div>
    )


}

export default Dropdown
