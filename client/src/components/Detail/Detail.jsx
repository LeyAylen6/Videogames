import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from './detail.module.css'

const Detail = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/videogames/${id}`)
        .then(({ data }) => {
            data.name && setGame(data)
        });
    }, [id]);

    return( 
        <div classname={styles.detailContainer}>
            {game.name ? <h2>{game.name}</h2> : null}

            {game.image ? <img src={game.image} alt={game.name} /> : null}

           
            {game.Description ? <h2>{game.Description}</h2> : null}
            {game.platforms ? <ul>Platforms: {game.platforms.map(platform => <li key={platform.id}>{platform.name}</li>)}</ul> : null }
            {game.releaseDate ? <h2>{game.releaseDate}</h2> : null}
            {game.rating ? <h2>{game.rating}</h2> : null}
            {game.genres ? <ul>Genres: {game.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}</ul> : null }
        </div>
)}

export default Detail;