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
        genre: undefined
    })

    let [errors, setErrors] = useState({});

    useEffect(() => {
        getAllGenres(dispatch);
        getAllPlatforms(dispatch);

        if (!props.create) {
            let gameRestore = allGames.filter(game => game.id === id)
            console.log(gameRestore)
            
            setState({
                ...state,
                name: gameRestore[0].name,
                image: gameRestore[0].image,
                description: gameRestore[0].description,
                releaseDate: gameRestore[0].releaseDate, 
                rating: gameRestore[0].rating, 
                platforms: gameRestore[0].platforms[0].name,
                genre: gameRestore[0].genres?.map(game => game.id)
            })
            
        } else {
            setState({...state, genre: []})
        }
        
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
            platforms: '',
            genre: []
        })
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        updateGame({id: id, ...state}, dispatch)
    }

    const isChecked = (id) => {
        return state.genre?.includes(id)
    }

    // OnSubmit ejecuta una funcion distinta si es create o update
    return (
        <form className={styles.formContainer} onSubmit={props.create ? handleSubmit : handleUpdate}>
            
            <div className={styles.left}> 
                <h1>{props.create ? '- Add a new game -' : '- Update game -' }</h1>
                
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
                
                <select onChange={handleChange} name='platforms' value={state.platforms} className={styles.selectForm}> 
                        
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
                                    value={genre.id} 
                                    defaultChecked={isChecked(genre.id)}
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
                    <span className={styles.text}>{props.create ? 'Create game' : 'Update game'}</span>
            </button>

        </form>
    )
}

export default Form;