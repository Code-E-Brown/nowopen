import styles from '../NavBar.module.css'

const Searchbar = () => {
    return (
        <div className={styles.searchDiv}>
            <select defaultValue='What are you searching for?' className={styles.searchInput} type='text'>
                <option className={styles.categoryPlaceHolder} disabled>What are you searching for?</option>
                <option>Food</option>
                <option>Retail</option>
                <option>Event</option>
                <option>All of the above!</option>
            </select>

            <label className={styles.searchLineLabel}></label>
            <input className={styles.searchInput} type='text'></input>
            <div className={styles.redSearchBox}>
                <svg
                    className={styles.magnifyingGlass}
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="50" height="50"
                    viewBox="0 0 172 172"
                    style={{ fill: 'white' }}
                ><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M72.24,10.32c-32.33062,0 -58.48,26.14938 -58.48,58.48c0,32.33063 26.14938,58.48 58.48,58.48c11.54281,0 22.22563,-3.38625 31.2825,-9.1375l42.2475,42.2475l14.62,-14.62l-41.71,-41.6025c7.49813,-9.83625 12.04,-22.02406 12.04,-35.3675c0,-32.33062 -26.14937,-58.48 -58.48,-58.48zM72.24,24.08c24.76531,0 44.72,19.95469 44.72,44.72c0,24.76531 -19.95469,44.72 -44.72,44.72c-24.76531,0 -44.72,-19.95469 -44.72,-44.72c0,-24.76531 19.95469,-44.72 44.72,-44.72z"></path></g></g></svg>
            </div>
        </div>
    )
}

export default Searchbar
