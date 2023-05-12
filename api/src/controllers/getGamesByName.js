const { Videogame } = require('../db');
const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')
const { Op } = require("sequelize");

//     Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getGamesByName = async(name) => {
    const { URL_BASE, KEY } = process.env;

    // const arr = name.split(' ')

    // name = arr.map(string => {

    //     let mayus = string[0].toUpperCase() 
    //     let minusc = string.slice(1, string.length).toLowerCase()

    //     return mayus + minusc
    // });

    
        // var regex = new RegExp(`^${nombreRecibido}$,gi`)
        // name.match(regex)

        // 'javascript'.localeCompare('JavaScrpt')

    const gamesFound = await Videogame.findAll({
        where: { 
            name: { [Op.like]: `%${name}%`} 
        },
        limit: 15
    })
    
    let savedGames = gamesFound.length
    
    const { data } = await axios(`${URL_BASE}/games?search=${name}&page_size=${15-savedGames}&key=${KEY}`)

    if(data.length < 1) throw new Error('No existe un videojuego con el nombre solicitado')

    let object = data?.results?.map(game => objectConstructor(game))

    return [...gamesFound, ...object]; 
    
    // ! Se envia el mismo objeto normalizado que en byId y en allGames
}

module.exports = { getGamesByName }