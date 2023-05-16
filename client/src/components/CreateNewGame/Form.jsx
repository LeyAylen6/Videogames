import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllPlatforms } from './../../redux/action'
import { validation } from './../Validation/validation.js'
import joystick from './../../assets/joystick.svg'
import { postNewGame } from './../../redux/action';

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
    const allPlatforms = useSelector(state => state.allPlatforms)
    const inputs = ['name', 'image', 'description', 'releaseDate'] 

    let [state, setState] = useState({
        name: '',
        image: '',
        description: '',
        releaseDate: '', 
        rating: 0, 
        platform: '',
        genres: []
    })

    let [errors, setErrors] = useState({});

    useEffect(() => {
        getAllGenres(dispatch);
        getAllPlatforms(dispatch);
    }, [])


    // Controla valores de los input y errores
    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                setState({
                    ...state,
                    genres: [...state.genres, event.target.value]
                }) 
            }

        } else {
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
    }

    const typesOfInputs = (input) => {
        switch(input) {
            case 'releaseDate':
                return 'date'
            default:
                return 'text'
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postNewGame(state, dispatch); // Envio el estado con todo el obj armado del juego
        
        setState({
            name: '',
            image: '',
            description: '',
            releaseDate: '', 
            rating: 0, 
            platform: '',
            genres: []
        })
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            
            <div className={styles.left}> 
                <h1>- Add a new game -</h1>
                
                {inputs?.map(input => {
                    return (
                        <div className={styles.inputContainer} key={input.id}>
                            
                            <label className={styles.label} htmlFor={input} >
                                {input}
                            </label>

                            <input 
                                className={styles.input} 
                                name={input} 
                                type={typesOfInputs(input)} 
                                onChange={handleChange} 
                                value={state[input]} 
                                placeholder={`Write a ${input}`} 
                            ></input>                      
                            
                            <div className={styles.errorContainer} >
                                {errors[input] ? <p className={styles.error}>{errors[input]}</p> : null}
                            </div>
                            
                         </div>  
                    )}
                )}

                <div className={styles.ratingContainer}>
                    <h2>Rating</h2>
                    <div className={styles.rating}>

                        <input className={styles.radio} type="radio" checked={state.rating > 4} />
                        <label className={styles.star} onClick={() => setState({ ...state, rating: 5 })}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 3} />
                        <label className={styles.star} onClick={() => setState({ ...state, rating: 4 })}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 2} />
                        <label className={styles.star} onClick={() => setState({ ...state, rating: 3 })}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 1} />
                        <label className={styles.star} onClick={() => setState({ ...state, rating: 2 })}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 0} />
                        <label className={styles.star} onClick={() => setState({ ...state, rating: 1 })}>★</label>
                    
                    </div>
                </div>
                
                <select onChange={handleChange} className={styles.selectForm}> 
                        
                    <option>Platform</option>

                    {allPlatforms?.map((platform, index) => {
                        return <option value={platform} key={`platform-${index}`} >{platform}</option> 
                    })}

                </select>
            </div>

            <div className={styles.right}> 

                <img src={joystick} />
                <div className={styles.checkboxContainer}>
                    {allGenres?.map(genre => {
                        return ( 
                            <label key={genre.id} className={styles.labelCheckbox}>
                                <input 
                                    id={genre.id}
                                    type="checkbox" 
                                    value={genre.name} 
                                    onChange={handleChange} 
                                    className={styles.checkboxForm}>
                                </input> 

                                {genre.name}
                            </label>
                        )
                    })}
                </div>

                <button 
                    className={styles.submitButton} 
                    type='submit' 
                    disabled= { Object.values(errors).length != 0 }
                    > Create game
                </button>
            </div>
        </form>
    )
}

export default Form;