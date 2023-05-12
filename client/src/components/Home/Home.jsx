import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../../redux/action";
import GameCard from "../GameCard/GameCard"
import style from './home.module.css'
import { orderBy } from "../../redux/action";
import { useState } from "react";
import { getAllGenres } from "../../redux/action";

const Home = () => {
    const dispatch = useDispatch()
    const allGamesFiltered = useSelector(state => state.allGamesFiltered)
    const allGenres = useSelector(state => state.allGenres)
    console.log(allGenres)

    let [state, setState] = useState({
        ubication: '',
        order: '',
        genres: ''
    })

    useEffect(() => {
        getAllGames(dispatch)
        getAllGenres(dispatch)
    },[])

    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })

        dispatch(orderBy({
            ...state,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div className={style.homeContainer}>

            <select value={state.order} name='order' onChange={onChange}>
                <option value=''>Order by</option>
                <option value='ascendent'>Ascendent</option>
                <option value='descendent'>Descendent</option>
                <option value='alfabetic'>Alphabetically</option>
                <option value='rating'>Rating</option>
            </select>

            <h2>Filtrar por: </h2>
            <select value={state.ubication} name='ubication' onChange={onChange}>
                <option value=''>Ubicacion</option>
                <option value='API'>API</option>
                <option value='DB'>Data base</option>
            </select>

            <select value={state.genres} name='genres' onChange={onChange}>
                <option value=''>Genres</option>

                {allGenres?.map(genre => <option value={genre.name} >{genre.name}</option> )} 
            
            </select>

            {allGamesFiltered?.map((game) => {
                return <GameCard game={game} key={game.id} /> })
            }

            {/* PAGINADO --> 15 juegos por página SOLO obtener y paginar los primeros 100 videojuegos*/} 
        </div>
    )
}

export default Home;