import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../GameCard/GameCard"
import style from './home.module.css'
import { getAllGames, getAllGenres, orderBy } from "../../redux/action";
import { useState } from "react";

const Home = () => {
    const dispatch = useDispatch()
    const { allGamesFiltered, allGenres, page, allGames, nextPage } = useSelector(state => state)

    let [state, setState] = useState({
        ubication: '',
        order: '',
        genres: '',
        prev: '',
        next: ''
    })

    useEffect(() => {
        if (allGames.length == 0) {
            getAllGames(dispatch)
            getAllGenres(dispatch)
        }
    },[])

    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })

        dispatch(orderBy({
            ...state,
            [event.target.name]: event.target.value
        }))

        setState({
            ...state,
            
            [event.target.name]: event.target.value,
            prev: false,
            next: false,
        })
    }

    return (
        <div className={style.homeContainer}>
            
            <div className={style.cardsContainer}>
                {allGamesFiltered?.map((game) => {
                    return <GameCard game={game} key={game.id} /> })
                }
            </div>
            
            <div className={style.filtersContainer}>
                <select value={state.order} name='order' onChange={onChange}>
                    <option value=''>Order by</option>
                    <option value='ascendent'>Ascendent</option>
                    <option value='descendent'>Descendent</option>
                    <option value='alfabetic'>Alphabetically</option>
                    <option value='rating'>Rating</option>
                </select>

                {/* <h2>Filtrar por: </h2> */}
                <select value={state.ubication} name='ubication' onChange={onChange}>
                    <option value=''>Ubicacion</option>
                    <option value='API'>API</option>
                    <option value='DB'>Data base</option>
                </select>

                <select value={state.genres} name='genres' onChange={onChange}>
                    <option value=''>Genres</option>

                    {allGenres?.map(genre => <option value={genre.name} >{genre.name}</option> )} 
                
                </select>
            </div>

            <div>
                {page > 1 ? <button name='prev' value='true' onClick={onChange} >Previous</button> : null}
                <p>{page}</p>
                {nextPage ? <button name='next' value='true' onClick={onChange} >Next</button> : null}
            </div>

        </div>
    )
}

export default Home;