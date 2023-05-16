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
                return (
                    <GameCard 
                        key={game.id} 
                        name={game.name}
                        image={game.image}
                        description={game.description}
                        releaseDate={game.releaseDate} 
                        rating={game.rating}
                        platform={game.platform}
                        genres={game.genres}
                    />
                )
            })}
        </div>
    )
}

export default MyGames;