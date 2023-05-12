import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME';
export const GET_GENRES = 'GET_GENRES';

export const ORDER = 'ORDER'

export const getAllGames = async(dispatch) => {
    try {
        const { data } = await axios('http://localhost:3001/videogames')
        dispatch({ type: GET_ALL_GAMES, payload: data })
    
    } catch(error) {
        console.log(error)
        // Agregar cartel de error. Vuelva a intentar.
    }
}

export const orderBy = (object) => {
    return { type: ORDER, payload: {ubication: object.ubication, order: object.order, genres: object.genres }}
}

export const getAllGenres = async(dispatch) => {
    const { data } = await axios(`http://localhost:3001/genres`)
    console.log(data)
    dispatch({ type: GET_GENRES, payload: data })
}

export const getGamesByName = async(name, dispatch) => {
    const { data } = await axios(`http://localhost:3001/videogames?name=${name}`)
    dispatch({ type: GET_ALL_GAMES, payload: data })
}



