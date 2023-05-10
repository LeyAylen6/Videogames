import { Link } from "react-router-dom";
import styles from "./GameCard.module.css"

const GameCard = (props) => {
    return (
        <div className={styles.cardContainer}>
            
            <Link to={`/detail/${props.game.id}`} >
                <img src={props.game.image} alt={props.game.name} />
            </Link>
            
            <h1>Nombre: {props.game.name}</h1>
            <h2>Géneros: {props.game.genren} </h2>
            
        </div>
    )
}

export default GameCard;