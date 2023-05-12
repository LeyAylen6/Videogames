import styles from './searchBar.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGamesByName } from '../../redux/action';
import search from './../../assets/search.svg'

const SearchBar = () => {
    const dispatch = useDispatch();
    let [name, setName] = useState();

    const onSearch = () => {
        getGamesByName(name, dispatch)
    } 

    const onChange = (event) => {
        setName(event.target.value)
    }

    return ( 
        <div className={styles.searchBar}>
            <input className={styles.searchBarInput} placeholder='Search by name' name='name' value={name} onChange={onChange} />
            <button className={styles.searchBarButton} onClick={() => {onSearch() ; setName('')}} >
                <img src={search} onClick={() => {onSearch() ; setName('')}}/>
            </button> 
        </div>
    )
}

export default SearchBar;
        