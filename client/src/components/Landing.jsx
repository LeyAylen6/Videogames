import imgLanding from './../assets/imgLanding.png'

const Landing = () => {
    return( 
        <div>
            <h1>Henry Videogames</h1>
            <img src={imgLanding} alt='Henry Videogames'></img>
            <button>Ingresar</button>
        </div>
    )
}

export default Landing;