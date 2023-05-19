import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllPlatforms } from './../../redux/action'
import { validation } from './../Validation/validation.js'
import joystick from './../../assets/joystick.svg'
import { postNewGame } from './../../redux/action';

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
        genre: []
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
                    genre: [...state.genre, event.target.value]
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
            genre: []
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
                
                <select onChange={handleChange} name='platform' value={state.platform} className={styles.selectForm}> 
                        
                    <option value={''} >Platform</option>

                    {allPlatforms?.map((platform, index) => {
                        return <option value={platform} key={`platform-${index}`} >{platform}</option> 
                    })}

                </select>
            </div>

            <div className={styles.right}> 

                <img src={joystick} />
                <h2>What genre does the game belong to?</h2>

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
            </div>

            <button 
                className={styles.submitButton} 
                type='submit' 
                disabled= { Object.values(errors).length != 0 }
                >
                    <span className={styles.text}>Create game</span>
            </button>

        </form>
    )
}

export default Form;