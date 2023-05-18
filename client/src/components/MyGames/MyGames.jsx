import { useDispatch, useSelector } from "react-redux";
import GameCard from "../GameCard/GameCard";
import { useEffect } from "react";
import { getMyGames } from "../../redux/action";

const MyGames = () => {
    const gamesCreate = useSelector(state => state.gamesCreate);
    const dispatch = useDispatch();

    useEffect(() => {
        getMyGames(dispatch)
    }, []);

    return( 
        <div>
            {gamesCreate?.map(game => {
                console.log(game)
                return (
                    <GameCard 
                        game={game} 
                        key={game.id}
                    />
                )
            })}
        </div>
    )
}

export default MyGames;