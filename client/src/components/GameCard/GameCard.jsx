import { Link } from "react-router-dom";
import styles from "./GameCard.module.css"
import { deleteGame, updateGame }from './../../redux/action'
import { useDispatch } from "react-redux";

const GameCard = (props) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        deleteGame(props.game.id, dispatch)
    }

    return (
        <div className={styles.cardContainer}>
            
            {props.activated && <button onClick={handleDelete} className={styles.deleteButton}>x</button>}
            {props.activated && <Link to={`/update/${props.game.id}`} className={styles.updateLink} >Edit</Link>}

            <Link to={`/detail/${props.game.id}`} className={styles.linkImage} >
                <img src={props.game.image} alt={props.game.name} />
            </Link>

            <Link to={`/detail/${props.game.id}`} className={styles.linkName}>
                <h1 className={styles.name}>{props.game.name}</h1>
            </Link>

            <div className={styles.genresContainer}>
                {props.game.genres?.map(genre => <h2 key={genre.id}>{genre.name}</h2>)} 
            </div>
            
        </div>
    )
}

export default GameCard;