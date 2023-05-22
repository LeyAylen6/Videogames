import { useDispatch } from 'react-redux'
import styles from './../../components/Error/error.module.css'
import { clear } from '../../redux/action';

const Error = (props) => {
    const dispatch = useDispatch();

    const onClick = () => {
        clear(dispatch)
    }

    return (
        <div className={styles.background}>
            <div className={styles.error}>
                <h1 className={styles.message}>{props.error}</h1>
                <button className={styles.delete} onClick={onClick}>Aceptar</button>
             
            </div>
        </div>
    );
}

export default Error;