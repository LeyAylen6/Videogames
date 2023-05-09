const { Videogame } = require('../db');
const axios = require('axios');

//     Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getGamesByName = async(name) => {
    const { URL_BASE, KEY } = process.env;

    const arr = name.split(' ')

    name = arr.map(string => {

        let mayus = string[0].toUpperCase() 
        let minusc = string.slice(1, string.length).toLowerCase()

        return mayus + minusc
    });

    const gamesFound = await Videogame.findAll({
        where: { name: name },
        limit: 15
    })
    
    let savedGames = gamesFound.length
    
    // offset: 5, limit: 5
    const response = await axios(`${URL_BASE}/games?search=${name}&page_size=${15-savedGames}&key=${KEY}`)

    if(response.length < 1) throw new Error('No existe un video juego con el nombre solicitado')
    return response.data
}

module.exports = { getGamesByName }