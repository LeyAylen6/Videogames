import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameCard from "../GameCard/GameCard"
import style from './home.module.css'
import { getAllGames, getAllGenres, clearGamesByName, orderBy, restoreAllGames } from "../../redux/action";
import { useState } from "react";
import noMatches from './../../assets/noHayResultados.svg'
import loading from './../../assets/loading.gif'

const Home = () => {
    const dispatch = useDispatch()
    const { allGamesFiltered, gamesByName, allGenres , page, allGames, nextPage } = useSelector(state => state)

    let [state, setState] = useState({
        ubication: '',
        order: '',
        genres: '',
        prev: '',
        next: '',
        allGames: true
    })

    useEffect(() => {
        if (allGames.length == 0) {
            getAllGames(dispatch)
            getAllGenres(dispatch)
        }

        if (gamesByName.length != 0) setState({...state, allGames: false})

    },[gamesByName])

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

    const onClick = () => {
        restoreAllGames(dispatch)
        setState({
            ...state,
            allGames: true
        })
        clearGamesByName(dispatch)
    }

    return (
        <div className={style.homeContainer}>
            
            {/* <h1>Los géneros mas populares</h1> */}
            <section>
                {/* <div className={style.genresContainer}> 
                    {allGenres?.map((genre) => {
                        return <p className={style.genreCard}key={genre.id}>{genre.name}</p> 
                        })
                    }
                </div> */}
                
                
                <div className={style.container} >
                    {allGames.length < 1 && allGamesFiltered.length < 1 ? <img src={loading} className={style.loading} /> : null}
                    
                    {(allGames.length > 0 && allGamesFiltered.length < 1) && 
                        <div className={style.messageNoMatches}>
                            <img src= {noMatches} />
                            <span>No matches were found for the search</span>
                        </div>
                    }

                    <div className={style.cardsContainer}>
                        {(state.allGames && allGamesFiltered.length > 0 ? allGamesFiltered : gamesByName).map((game) => {
                            return <GameCard game={game} key={game.id} /> 
                            })
                        }
                    </div>
                </div>
                
                {(state.allGames && allGamesFiltered.length > 0) && 
                    <div>
                        {page > 1 ? <button name='prev' value='true' onClick={onChange} >Previous</button> : null}
                        <p>{page}</p>
                        {nextPage ? <button name='next' value='true' onClick={onChange} >Next</button> : null}
                    </div>
                }

            </section>

            <section className={style.filtersContainer}>
                <button onClick={onClick} className={style.allGamesButton}>Todos los juegos</button>

                {state.allGames && 
                    <div className={style.filters}>
                        <select value={state.order} name='order' onChange={onChange}>
                            <option value=''>Order by</option>
                            <option value='ascendent'>Ascendent</option>
                            <option value='descendent'>Descendent</option>
                            <option value='alfabetic'>Alphabetically</option>
                            <option value='rating'>Rating</option>
                        </select>

                        <select value={state.ubication} name='ubication' onChange={onChange}>
                            <option value=''>Ubicacion</option>
                            <option value='API'>API</option>
                            <option value='DB'>Data base</option>
                        </select>

                        <select value={state.genres} name='genres' onChange={onChange}>
                            <option value=''>Genres</option>

                            {allGenres?.map(genre => <option value={genre.id} >{genre.name}</option> )} 
                        
                        </select>
                    </div>
                }

            </section>

        </div>
    )
}

export default Home;