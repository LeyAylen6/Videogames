import SearchBar from '../SearchBar/SearchBar';
import styles from './navBar.module.css';
import { Link } from 'react-router-dom';
import exit from './../../assets/exit.svg';
import logo from './../../assets/LOGO.jpeg';

const NavBar = () => {
    return (
        <div className={styles.navBarContainer}>
            <Link to='/home'>
                <img src={logo} className={styles.logo}></img>
            </Link>
            <Link to='/home' className={styles.link}>Home</Link>
            <Link to='/create' className={styles.link} >
                Add a game
            </Link>
            <Link to={''} className={styles.link}>My games</Link>
            <SearchBar />
            <Link to='/' className={styles.exitContainer}>
                <img src={exit} className={styles.exit}/>
            </Link>
           
        </div>
    )
}

export default NavBar;