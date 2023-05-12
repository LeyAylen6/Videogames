import SearchBar from '../SearchBar/SearchBar';
import styles from './navBar.module.css';
import { Link } from 'react-router-dom';
import exit from './../../assets/exit.svg';
import logo from './../../assets/LOGO.jpeg';

const NavBar = () => {
    return (
        <div className={styles.navBarContainer}>
            <img src={logo} className={styles.logo}></img>
            <Link to='/create' className={styles.createLink} >
                Add a game
            </Link>
            <SearchBar />
            <Link to='/' className={styles.exitContainer}>
                <img src={exit} className={styles.exit}/>
            </Link>
           
        </div>
    )
}

export default NavBar;