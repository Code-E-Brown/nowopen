import { useEffect, useState } from "react"
import { AiOutlineUser } from 'react-icons/ai'
import styles from '../../../NavBar/NavBar.module.css'
import Dropdown from '..'

function DropDownProfileButton() {   // {styles} was passed in as a prop, no longer needed, best to import
    const [showMenu, setShowMenu] = useState(false)
// console.log(user)
    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return
        const closeMenu = () => {
            setShowMenu(false)
        }
        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    return (
        <div>
            <button className={styles.avatarButton} onClick={openMenu}>
                <AiOutlineUser className={styles.avatarCircle} />
            </button>
            {showMenu && (
                <Dropdown styles={styles} />
            )}
        </div>
    )

}

export default DropDownProfileButton;
