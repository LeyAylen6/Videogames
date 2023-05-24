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
        <div className={styles.detail}>
            <section className={styles.left}>
                <div className={styles.imageContainer}>
                    {image ? <img className={styles.image} src={image} alt={name} /> : null}
                </div>
                {Description ? <h2>Description: {Description}</h2> : null}
            </section>

            <section className={styles.right} >
                {name ? <h1 className={styles.name}>{name}</h1> : null}

                <h2>Platforms: </h2>
                {platforms && <div className={styles.miniCards}>
                    {platforms.map(platform => {
                        return (
                            <p className={styles.map} key={platform.name}>
                                {platform.name}
                            </p>
                        )
                    })}

                    </div>}

                <hr />
                {releaseDate ? <h2>Release Date: {releaseDate}</h2> : null}
                <hr />
                {rating ? <h2>Rating: {rating}</h2> : null}
                <hr />
                <h2>Genres: </h2>
                {genres ? <div className={styles.miniCards}>{genres.map(genre => <p className={styles.map} key={genre.id}>{genre.name}</p>)}</div> : null }
            
            </section>

        </div>
)}

export default Detail;