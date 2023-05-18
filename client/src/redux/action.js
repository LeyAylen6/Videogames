import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const ORDER = 'ORDER'
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const POST_GAME = 'POST_GAME';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const MESSAGE = 'MESSAGE';
export const CLEAR = 'CLEAR';
export const GAMES_CREATED = 'GAMES_CREATED';
export const CLEAR_STATE = 'CLEAR_STATE';

export const getAllGames = async(dispatch) => {
    try {
        const { data } = await axios('http://localhost:3001/videogames')
        dispatch({ type: GET_ALL_GAMES, payload: data })
    
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error.response.data})
    }
}

export const orderBy = (object) => {
    return { type: ORDER, payload: {
        ubication: object.ubication, 
        order: object.order, 
        genres: object.genres,
        prev: object.prev,
        next: object.next
    }}
}

export const getAllGenres = async(dispatch) => {
    try {
        const { data } = await axios(`http://localhost:3001/genres`)
        dispatch({ type: GET_GENRES, payload: data })
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error.response.data})
    }
}

export const getGamesByName = async(name, dispatch) => {
    try {
        const { data } = await axios(`http://localhost:3001/videogames?name=${name}`)
        dispatch({ type: GET_GAMES_BY_NAME, payload: data })
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error.response.data})
    }
}

export const postNewGame = async(game, dispatch) => {
    try {
        const { data } = await axios.post(`http://localhost:3001/videogames`, game)
        dispatch({ type: POST_GAME, payload: data })    // Respuesta respecto al post
        dispatch({ type: MESSAGE, payload: 'Successfully created!' })
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error.response.data})
    }
}

export const getDetail = async(id, dispatch) => {
    const { data } = await axios(`http://localhost:3001/videogames/${id}`)
    dispatch({ type: GET_DETAIL , payload: data })
}

export const getAllPlatforms = (dispatch) => {
    dispatch({ type: GET_PLATFORMS }) 
}

export const clear = (dispatch) => {
    dispatch({ type: CLEAR })
}

export const getMyGames = (dispatch) => {
    dispatch({ type: GAMES_CREATED })
}

export const clearState = (dispatch) => {
    dispatch({ type: CLEAR_STATE })
}


