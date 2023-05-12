import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from './../../redux/action'
import { validation } from './../Validation/validation.js'

// 📍 FORM PAGE |: Crear un nuevo videojuego.

// Nombre.
// Imagen.
// Descripción.
// Plataformas.
// Fecha de lanzamiento.
// Rating.
// Posibilidad de seleccionar/agregar varios géneros en simultáneo.
// Botón para crear el nuevo videojuego.
// [IMPORANTE]: Validaciones:
// Por ejemplo: que el nombre del videojuego no pueda contener símbolos, o que el rating no pueda exceder determinado valor, etc.

const Form = () => {
    const allGenres = useSelector(state => state.allGenres)
    const dispatch = useDispatch()
    
    const inputs = ['name', 'image', 'description', 'releaseDate', 'rating'] // patform -> select , generos checkbox??

    useEffect(() => {
        getAllGenres(dispatch)
    }, [])

    let [state, setState] = useState({
        name: '',
        image: '',
        description: '',
        releaseDate: '', 
        rating: 0, 
        platform: '',
        genres: ''
    })

    let [errors, setErrors] = useState({});

    const handleChange = (event) => {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value
        })

        setErrors(validation({
                ...state,
                [event.target.name]: event.target.value
            })
        )
    }

    const typesOfInputs = (input) => {
        switch(input) {
            case 'rating':
                return 'number'    
            case 'releaseDate':
                return 'date'
            default:
                return 'text'
        }
    }

    return (
        <form className={styles.formContainer}>
            <h1>- Add a new game -</h1>
            
            {inputs?.map(input => {

                return (
                <div className={styles.inputContainer} key={input.id}>

                    <label className={styles.label} htmlFor={input} >{input}</label>
                    <input className={styles.input} name={input} type={typesOfInputs(input)} onChange={handleChange} value={state[input]} placeholder={`write a ${input}`} ></input>                      
                    
                    <div className={styles.errorContainer} >
                        {errors[input] ? <p className={styles.error}>{errors[input]}</p> : null}
                    </div>
                    
                </div>
                )}
            )}
            
            {/* <select onChange={''}> 
            
            {allPlatforms?.map (platform => <option value={state.platform} ky={platform.id} >{platform}</option> )}

            </select> */}
            

            {/* {allGenres?.map(genre => {
                return ( 
                    <label key={genre.id}> {genre.name}
                        <input type="checkbox" value={genre.name}></input> 
                    </label>
                )
            })} */}
            
            {/* disabled={} */}
            <button className={styles.submitButton} type='submit' > 
                Create game
            </button>
        </form>
    )
}

export default Form;