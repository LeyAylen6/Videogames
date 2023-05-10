import axios from 'axios';

export const GET_ALL_GAMES = 'GET_ALL_GAMES';

export const getAllGames = async(dispatch) => {
    try {
        const { data } = await axios('http://localhost:3001/videogames')
        console.log(data)
        dispatch({ type: GET_ALL_GAMES, payload: data })
    
    } catch(error) {
        console.log(error)
        // Agregar cartel de error. Vuelva a intentar.
    }
}
