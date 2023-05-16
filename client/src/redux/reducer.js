import { GET_ALL_GAMES, GET_GENRES, ORDER, POST_GAME, GET_PLATFORMS, MESSAGE, CLEAR, GAMES_CREATED, PREVIOUS, NEXT } from './action';

let initialState = {
    allGames: [],
    allGamesFiltered: [],
    allGenres: [],
    gamesCreate: [],
    allPlatforms: [],
    message: '',
    page: 1,
};

export const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALL_GAMES: 
            return {
                ...state,
                allGames: payload,
                // allGamesFiltered: payload
                allGamesFiltered: [...payload].slice(0, 15)
            }

        case GET_GENRES: 

            return {
                ...state,
                allGenres: payload,
            }

        case POST_GAME:
            return {
                ...state,
                allGames: [payload, state.allGames]
            }

        case GET_PLATFORMS:

            let platformsFound = [];
            let allGames = state.allGames;

            for (let i = 0; i < allGames.length; i++) {

                for (let j = 0; j < allGames[i].platforms.length; j++) {
                    if(!platformsFound.includes(allGames[i].platforms[j].name))
                    platformsFound.push(allGames[i].platforms[j].name)
                }
            }

            return {
                ...state,
                allPlatforms: platformsFound,
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

            case GAMES_CREATED: 
                return {
                    ...state,
                    gamesCreate: [...state.allGames].filter(game => typeof(game.id) !== 'number')
                }

            case MESSAGE:
                return {
                    ...state,
                    message: payload
                }

            case CLEAR:
                return {
                    ...state,
                    message: ''
                }

            case NEXT: 
                let actualPage = state.page + 1
                let skip = ((actualPage - 1) * 15);
                let next = actualPage * 15

                let result = [...state.allGames].slice(skip, next)

                if (result[result.length - 1] === state.allGames[result.length - 1]) {
                    break
                }

                return {
                    ...state,
                    page: actualPage,
                    allGamesFiltered: result
                }

            case PREVIOUS:
                let actualPagePrev = state.page;

                if(actualPagePrev > 1) actualPagePrev = state.page - 1

                let skipPrevious = ((actualPagePrev - 1) * 15);


                return {
                    ...state,
                    page: actualPagePrev,
                    allGamesFiltered: [...state.allGames].slice(skipPrevious, (actualPagePrev) * 15),
                }

            default:
                return {
                    ...state
                }
    }
 }