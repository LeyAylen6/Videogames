import { GET_ALL_GAMES } from './action';

let initialState = {
    allGames: []
};

export const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALL_GAMES: 
            return {
                ...state,
                allGames: payload
            }
        default:
            return {
                ...state
            }
    }
 }