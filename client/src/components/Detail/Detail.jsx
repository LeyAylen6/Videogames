import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './detail.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from "../../redux/action";
import { clearState } from "../../redux/action";

const Detail = () => {
    const { id } = useParams();
    const gameDetail = useSelector(state => state.gameDetail)
    const { name, image, Description, platforms, releaseDate, rating, genres } = gameDetail
    const dispatch = useDispatch();

    useEffect(() => {
        getDetail(id, dispatch);
        
        return () => {
            clearState(dispatch)
        }
    }, []);

    return( 
        <div classname={styles.detailContainer}>
            {name ? <h2>{name}</h2> : null}
            {image ? <img src={image} alt={name} /> : null}
            {Description ? <h2>{Description}</h2> : null}
            {platforms ? <ul>Platforms: {platforms.map(platform => <li key={platform.id}>{platform.name}</li>)}</ul> : null }
            {releaseDate ? <h2>{releaseDate}</h2> : null}
            {rating ? <h2>{rating}</h2> : null}
            {genres ? <ul>Genres: {genres.map(genre => <li key={genre.id}>{genre.name}</li>)}</ul> : null }
        </div>
)}

export default Detail;