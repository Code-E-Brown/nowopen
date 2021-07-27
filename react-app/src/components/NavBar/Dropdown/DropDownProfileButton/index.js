import { useEffect, useState } from "react"
import { AiOutlineUser } from 'react-icons/ai'
import Dropdown from '..'

function DropDownProfileButton({ styles }) {
    const [showMenu, setShowMenu] = useState(false)

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
            <button onClick={openMenu}>
                <AiOutlineUser className={styles.avatarCircle} />
            </button>
            {showMenu && (
                <Dropdown />
            )}
        </div>
    )

}

export default DropDownProfileButton;
