import { GET_ALL_GAMES, GET_GENRES, ORDER } from './action';

let initialState = {
    allGames: [],
    allGamesFiltered: [],
    allGenres: []
};

export const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALL_GAMES: 
            return {
                ...state,
                allGames: payload,
                allGamesFiltered: payload
            }

        case GET_GENRES: 
            return {
                ...state,
                allGenres: payload
            }
        
        case ORDER: 
            let ordering 

            switch(payload.order) {
                case 'ascendent':
                    ordering = [...state.allGames].sort((a, b) => a.id - b.id)
                    break

                case 'descendent':
                    ordering = [...state.allGames].sort((a, b) => b.id - a.id)
                    break

                case 'alfabetic':
                    ordering = [...state.allGames].sort((a,b) => a.name > b.name ? 1 : -1)
                    break

                case 'rating':
                    ordering = [...state.allGames].sort((a, b) => b.rating - a.rating)
                    break

                default:
                    ordering = state.allGames
                    break
            }

            switch(payload.ubication) {

                case 'API':
                    ordering = ordering.filter(game => typeof(game.id) == 'number')
                    break

                case 'DB':
                    ordering = ordering.filter(game => typeof(game.id) !== 'number')
                    break

                default:
                    break
            }   

            switch(payload.genres) {

                case '':
                    break

                default:
                    ordering = ordering.filter(game => {   // game -> genre -> array[i] (uno de sus generos) -> name de genre -//- (game.genre[i].name)
                        for(let i = 0; i < game.genres.length; i++) {
                            if (game.genres[i].name == payload.genres) {
                                return true;  
                            }  
                        }
                        return false; 
                    });
                    break
            }   

            return {
                ...state,
                allGamesFiltered: ordering
            }

        default:
            return {
                ...state
            }
    }
 }