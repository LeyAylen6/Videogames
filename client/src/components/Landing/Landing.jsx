import landing from './../../assets/Landing1.jpeg'
import logo from './../../assets/Logo.png'
import { Link } from 'react-router-dom';
import styles from './landing.module.css'

const Landing = () => {
    return( 
        <div className={styles.landing}>
            {/* <h1>Henry Videogames</h1> */}
            <img src={logo} className={styles.logo} alt='Henry Videogames'></img>
            <img src={landing} className={styles.background} alt='Henry Videogames Background' />
            <Link className={styles.redirect} to={'./home'}>Ingresar</Link>
            
        </div>
    )
}

export default Landing;