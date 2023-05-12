import { Link } from "react-router-dom";
import styles from "./GameCard.module.css"

const GameCard = (props) => {
    return (
        <div className={styles.cardContainer}>
            
            <Link to={`/detail/${props.game.id}`} className={styles.linkImage} >
                <img src={props.game.image} alt={props.game.name} />
            </Link>

            <Link to={`/detail/${props.game.id}`} className={styles.linkName}>
                <h1 className={styles.name}>{props.game.name}</h1>
                {/* <h2>Géneros: {props.game.genre} </h2> */}
            </Link>

            <div className={styles.genresContainer}>
                {props.game.genres?.map(genre => <h2>{genre.name}</h2>)} 
            </div>
            
        </div>
    )
}

export default GameCard;