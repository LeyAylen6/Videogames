import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllPlatforms, updateGame } from './../../redux/action'
import { validation } from './../Validation/validation.js'
import joystick from './../../assets/joystick.svg'
import { postNewGame } from './../../redux/action';
import { useParams } from 'react-router-dom';

const Form = (props) => {
    const dispatch = useDispatch()
    const { allPlatforms, allGenres, allGames } = useSelector(state => state)
    const inputs = ['name', 'image', 'description', 'releaseDate'] 

    const { id } = useParams();

    let [state, setState] = useState({
        name: '',
        image: '',
        description: '',
        releaseDate: '', 
        rating: 0, 
        platforms: '',
        genre: []
    })

    let [checkboxState, setCheckboxState] = useState(allGenres.map(genre => { return {...genre, check: false} }))

    let [errors, setErrors] = useState({});

    useEffect(() => {
        getAllGenres(dispatch);
        getAllPlatforms(dispatch);

        if (!props.create) {
            let gameRestore = allGames.filter(game => game.id === id)
            let genresRestored = gameRestore[0].genres?.map(game => game.id)
            console.log(gameRestore)
            
            setState({
                ...state,
                name: gameRestore[0].name,
                image: gameRestore[0].image,
                description: gameRestore[0].description,
                releaseDate: gameRestore[0].releaseDate, 
                rating: gameRestore[0].rating, 
                platforms: gameRestore[0].platforms[0].name,
                genre: genresRestored
            })

            setCheckboxState(checkboxState.map(genre => {
                return {
                    ...genre,
                    check: genresRestored.includes(genre.id)
                }
            }))

        }
    }, [])

    // Controla valores de los input y errores
    const handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            setCheckboxState(checkboxState.map(genre => {
                return {
                    ...genre,
                    check: genre.id == event.target.id ? !genre.check : genre.check
                    // Busca el id del que se hizo click y lo cambia al contrario. Por si pone o saca el tilde.
                }
            }))

            let newGenres

            if (event.target.checked) {
                newGenres = [...state.genre, event.target.value]

            } else {
                newGenres = state.genre.filter(id => id != event.target.id)
            }
            
            setState({
                ...state,
                genre: newGenres
            }) 

            setErrors(validation({
                ...state,
                genre: newGenres
            }))

        } else {
            event.preventDefault();
            setState({
                ...state,
                [event.target.name]: event.target.value
            })

            setErrors(validation({
                ...state,
                [event.target.name]: event.target.value
            }))
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
            platforms: '',
            genre: []
        })

        setCheckboxState(checkboxState.map(genre => { return {...genre, check: false} }))
    }

    const handleStars = (stars) => {
        setState({ 
            ...state, 
            rating: stars 
        })
    
        setErrors(validation({
            ...state,
            rating: stars
        })
    )} 

    const handleUpdate = (event) => {
        event.preventDefault();
        updateGame({id: id, ...state}, dispatch)
    }

    // OnSubmit ejecuta una funcion distinta si es create o update
    return (
        <form className={styles.formContainer} onSubmit={props.create ? handleSubmit : handleUpdate}>
            
            <div className={styles.left}> 
                <h1>{props.create ? '- Add a new game -' : '- Update game -' }</h1>
                
                {inputs?.map((input, index) => {
                    return (
                        <div className={styles.inputContainer} key={index}>
                            
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
                        <label className={styles.star} onClick={() => handleStars(5)}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 3} />
                        <label className={styles.star} onClick={() => handleStars(4)}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 2} />
                        <label className={styles.star} onClick={() => handleStars(3)}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 1} />
                        <label className={styles.star} onClick={() => handleStars(2)}>★</label>

                        <input className={styles.radio} type="radio"  checked={state.rating > 0} />
                        <label className={styles.star} onClick={() => handleStars(1)}>★</label>

                    </div>

                    <div className={styles.errorContainer} >
                        {errors.rating ? <p className={styles.error}>{errors.rating}</p> : null}
                    </div>

                </div>
                
                <select onChange={handleChange} name='platforms' value={state.platforms} className={styles.selectForm}> 
                        
                    <option value={''} >Platform</option>

                    {allPlatforms?.map((platform, index) => {
                        return <option value={platform} key={`platform-${index}`} >{platform}</option> 
                    })}

                </select>

                <div className={styles.errorContainer} >
                    {errors.platforms ? <p className={styles.error}>{errors.platforms}</p> : null}
                </div>  

            </div>

            <div className={styles.right}> 

                <img src={joystick} />
                <h2>What genre does the game belong to?</h2>

                <div className={styles.checkboxContainer}>
                    {checkboxState?.map(genre => {
                        return ( 
                            <label key={genre.id} className={styles.labelCheckbox}>
                                <input 
                                    id={genre.id}
                                    type="checkbox" 
                                    value={genre.id} 
                                    checked={genre.check}
                                    onChange={handleChange} 
                                    className={styles.checkboxForm}>
                                </input> 

                                {genre.name}
                            </label>
                        )
                    })}
                </div>

                <div className={styles.errorContainer} >
                    {errors.genre ? <p className={styles.error}>{errors.genre}</p> : null}
                </div>

            </div>


            
            <button 
                className={styles.submitButton} 
                type='submit' 
                disabled= { !state.name || Object.values(errors).length != 0 }
                >
                    <span className={styles.text}>{props.create ? 'Create game' : 'Update game'}</span>
            </button>

        </form>
    )
}

export default Form;