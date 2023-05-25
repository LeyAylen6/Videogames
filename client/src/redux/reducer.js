import { 
    GET_ALL_GAMES, 
    RESTORE_ALL_GAMES,
    GET_GENRES, 
    GET_GAMES_BY_NAME,
    ORDER, 
    POST_GAME, 
    GET_DETAIL, 
    GET_PLATFORMS, 
    MESSAGE, 
    CLEAR, 
    GAMES_CREATED, 
    CLEAR_STATE,
    CLEAR_GAMES_BY_NAME,
    DELETE_GAME,
    UPDATE_GAME,
    RESTORE_PAGE_1
} from './action';

let initialState = {
    allGames: [],
    allGamesFiltered: [],
    allGenres: [],
    gamesCreate: [],
    gameDetail: {},
    allPlatforms: [],
    gamesByName: [],
    message: '',
    page: 1,
    nextPage: true
};

export const rootReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ALL_GAMES: 
            return {
                ...state,
                allGames: payload,
                allGamesFiltered: [...payload].slice(0, 15),
                gamesCreate: payload.filter(game => typeof(game.id) !== 'number')
            }

        case RESTORE_ALL_GAMES:
            return {
                ...state,
                allGamesFiltered: [...state.allGames].slice(0, 15)
            }

        case GET_GENRES: 
            return {
                ...state,
                allGenres: payload,
            }

        case POST_GAME:
            return {
                ...state,
                allGames: [payload, ...state.allGames],
                allGamesFiltered: [payload, ...state.allGamesFiltered]
            }

        case GAMES_CREATED: 
            return {
                ...state,
                gamesCreate: [...state.allGames].filter(game => typeof(game.id) !== 'number')
            }

        case GET_DETAIL:
            return {
                ...state,
                gameDetail: payload
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

            case GET_GAMES_BY_NAME:
                return {
                    ...state,
                    gamesByName: payload
                }

            case ORDER: 

                let ordering
                let actualPage = state.page

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

                    case 'Genres':
                        break

                    default:
                        ordering = ordering.filter(game => {   
                            // game -> genre -> array[i] (uno de sus generos) -> name de genre -//- (game.genre[i].name)
                            
                            for(let i = 0; i < game.genres.length; i++) {
                                if (game.genres[i].id == payload.genres) {
                                    return true;  
                                }  
                            }
                            return false; 
                        });
                        break
                }  

                // ! PAGINADO 

                if (payload.prev && actualPage > 1) actualPage = actualPage - 1;

                else if (payload.next) actualPage = actualPage + 1;

                else actualPage = 1;

                let skip = ((actualPage - 1) * 15);
                let next = actualPage * 15

                let nextpage = ordering.slice(((actualPage) * 15), ((actualPage + 1) * 15)).length > 0

                ordering = ordering.slice(skip, next)
            
            return {
                ...state,
                nextPage: nextpage,
                page: actualPage,
                allGamesFiltered: ordering
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

            case CLEAR_STATE:
                return {
                    ...state,
                    gameDetail: {}
                }

            case CLEAR_GAMES_BY_NAME:
                return {
                    ...state,
                    gamesByName: []
                }

            case DELETE_GAME:
                return {
                    ...state,
                    allGames: [...state.allGames].filter(game => game.id !== payload),
                    allGamesFiltered: [...state.allGamesFiltered].filter(game => game.id !== payload),
                    gamesCreate: [...state.gamesCreate].filter(game => game.id !== payload)
                }

            case UPDATE_GAME:
                let index1 = [...state.allGames].findIndex(game => game.id === payload.id)
                let index2 = [...state.allGamesFiltered].findIndex(game => game.id === payload.id)
                let index3 = [...state.gamesCreate].findIndex(game => game.id === payload.id)
                
                let allGamesCopy = [...state.allGames]
                let allGamesFilteredCopy = [...state.allGamesFiltered]
                let gamesCreateCopy = [...state.gamesCreate]

                allGamesCopy[index1] = payload
                allGamesFilteredCopy[index2] = payload
                gamesCreateCopy[index3] = payload

                return {
                    ...state,
                    allGames: allGamesCopy,
                    allGamesFiltered: allGamesFilteredCopy,
                    gamesCreate: gamesCreateCopy
                }

            case RESTORE_PAGE_1:
                return {
                    ...state,
                    page: 1,
                    nextPage: true
                }
                    
            default:
                return {
                    ...state
                }
    }
 }