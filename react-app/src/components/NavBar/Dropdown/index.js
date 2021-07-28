import LogoutButton from '../../auth/LogoutButton'
import styles from '../../NavBar/NavBar.module.css'

function Dropdown() {

    return (
        <div className={styles.dropDown}>
            <LogoutButton />
        </div>
    )


}

export default Dropdown
