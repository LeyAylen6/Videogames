import { useDispatch, useSelector } from "react-redux";
import GameCard from "../GameCard/GameCard";
import { useEffect } from "react";
import { getMyGames } from "../../redux/action";
import styles from './myGames.module.css'

const MyGames = () => {
    const gamesCreate = useSelector(state => state.gamesCreate);
    const dispatch = useDispatch();

    useEffect(() => {
        getMyGames(dispatch)
    }, []);

    return( 
        <div className={styles.myGamesContainer}>
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
    )
}

export default MyGames;