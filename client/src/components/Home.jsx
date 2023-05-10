import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../redux/action";
import GameCard from "./GameCard/GameCard"
import style from './home.module.css'

const Home = () => {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.allGames)

    useEffect(() => {
        getAllGames(dispatch)
        console.log('hola')
    },[])

    return (
        <div className={style.homeContainer}>
            <h1>Hola</h1>
            <input placeholder='Busca por nombre' name='search' />
            <button>Search</button>
            
            {allGames?.map((game) => {
                return <GameCard game={game} key={game.id} /> })
            }

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