import { useDispatch, useSelector } from "react-redux";
import GameCard from "../GameCard/GameCard";
import { useEffect } from "react";
import { getMyGames } from "../../redux/action";
import styles from './myGames.module.css'
import notGamesSaved from './../../assets/noHayJuegos.svg'

const MyGames = () => {
    const gamesCreate = useSelector(state => state.gamesCreate);
    const dispatch = useDispatch();

    useEffect(() => {
        getMyGames(dispatch)
    }, []);

    return( 
        <div className={styles.myGamesContainer}>
            
            {gamesCreate.length < 1 && 
                <div className={styles.notResults}>
                    <img src={notGamesSaved} />
                    <h1>You haven't created any games yet.</h1>
                </div>
            }
            
            <div className={styles.myGames}>
                {gamesCreate?.map(game => {
                    return (
                        <GameCard 
                            activated={true}
                            game={game} 
                            key={game.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MyGames;