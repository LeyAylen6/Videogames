
const Home = () => {
    return (
        <div>
            <h1>Hola</h1>
            <input placeholder='Busca por nombre' name='search' />
            <button>Search</button>
            {/* <Cards />  */}
            {/* Crear component card --> Cada card tiene q tener mostrar Imagen - Nombre - Géneros y un detail que se abra con los detalles */}
            {/* Traer desde GET /videogames del back.  */}
            {/* Las cards deben multiplicarse con un map en home.*/}

            {/* FILTROS --> Genero de juego y por si vienen de la base o de la api */}

            {/* ORDEN --> ascendente / descendente / alfabéticamente / por rating. */}

            {/* PAGINADO --> 15 juegos por página SOLO obtener y paginar los primeros 100 videojuegos*/} 

        </div>
    )
}

export default Home;