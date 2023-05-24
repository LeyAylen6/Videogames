import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';
export const RESTORE_ALL_GAMES = 'RESTORE_ALL_GAMES';
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
export const CLEAR_GAMES_BY_NAME = 'CLEAR_GAMES_BY_NAME';
export const DELETE_GAME = 'DELETE_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const RESTORE_PAGE_1 = 'RESTORE_PAGE_1';

export const getAllGames = async(dispatch) => {
    try {
        const { data } = await axios('/videogames')
        dispatch({ type: GET_ALL_GAMES, payload: data })
    
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error?.response?.data || error })
    }
}

export const restoreAllGames = (dispatch) => {
    try {
        dispatch({ type: RESTORE_ALL_GAMES })
    
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error?.message})
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
        const { data } = await axios(`/genres`)
        dispatch({ type: GET_GENRES, payload: data })
        
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error?.response?.data || error })
    }
}

export const getGamesByName = async(name, dispatch) => {
    try {
        const { data } = await axios(`/videogames?name=${name}`)
        dispatch({ type: GET_GAMES_BY_NAME, payload: data })

    } catch(error) {
        dispatch({ type: MESSAGE, payload: error?.response?.data || error })
    }
}

export const postNewGame = async(game, dispatch) => {
    try {
        const { data } = await axios.post(`/videogames`, game)
        dispatch({ type: POST_GAME, payload: data })    // Respuesta respecto al post
        dispatch({ type: MESSAGE, payload: 'Successfully created!' })

    } catch(error) {
        console.log(error.response)
        dispatch({ type: MESSAGE, payload: error?.response?.data || error })
    }
}

export const getDetail = async(id, dispatch) => {
    const { data } = await axios(`/videogames/${id}`)
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

export const clearGamesByName = (dispatch) => {
    dispatch({ type: CLEAR_GAMES_BY_NAME })
}

export const deleteGame = async(id, dispatch) => {
    try {
        const response = await axios.delete(`/videogames/${id}`)
        
        if (response.status === 200) {
            dispatch({ type: DELETE_GAME, payload: id })
            dispatch({ type: MESSAGE, payload: 'Successfully removed!' })
        }
    
    } catch(error) {
        dispatch({ type: MESSAGE, payload: error?.response?.data || error })
    }
}

export const updateGame = async(game, dispatch) => {
    try {
        const { data } = await axios.put(`/videogames/${game.id}`, game)
       
        dispatch({ type: UPDATE_GAME, payload: data })
        dispatch({ type: MESSAGE, payload: 'Successfully updated!' })
       
    } catch(error) {
      
        dispatch({ type: MESSAGE, payload: error?.message})
    }
}

export const restorePage1 = (dispatch) => {
    dispatch({ type: RESTORE_PAGE_1 })
}



   


