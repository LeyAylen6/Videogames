import imgLanding from './../../assets/imgLanding.png'
import { Link } from 'react-router-dom';

const Landing = () => {
    return( 
        <div>
            <h1>Henry Videogames</h1>
            <img src={imgLanding} alt='Henry Videogames'></img>
            <Link to={'./home'}>Ingresar</Link>
        </div>
    )
}

export default Landing;