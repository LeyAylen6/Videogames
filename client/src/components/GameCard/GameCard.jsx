import { Link } from "react-router-dom";
import styles from "./GameCard.module.css"
import { deleteGame, updateGame }from './../../redux/action'
import { useDispatch } from "react-redux";

const GameCard = (props) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        deleteGame(props.game, dispatch)
    }

    // const handleEdit = () => {
    //     updateGame(props.game.id, dispatch)
    // }

    return (
        <div className={styles.cardContainer}>
            
            {props.activated && <button onClick={handleDelete} >x</button>}
            {props.activated && <Link to={`/update/${props.game.id}`}>Edit</Link>}

            <Link to={`/detail/${props.game.id}`} className={styles.linkImage} >
                <img src={props.game.image} alt={props.game.name} />
            </Link>

            <Link to={`/detail/${props.game.id}`} className={styles.linkName}>
                <h1 className={styles.name}>{props.game.name}</h1>
            </Link>

            <div className={styles.genresContainer}>
                {props.game.genres?.map(genre => <h2>{genre.name}</h2>)} 
            </div>
            
        </div>
    )
}

export default GameCard;