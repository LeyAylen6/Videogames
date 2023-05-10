const { Videogame } = require('../db')
const { Gender } = require('../db')
const { getAllGames } = require('./getAllGamesController')
const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getGameById = async(id) => {
    // Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
    // El videojuego es recibido por parámetro (ID).
    // Tiene que incluir los datos del género del videojuego al que está asociado.
    // Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
    const { URL_BASE, KEY } = process.env;
    
    // Para juegos en la base de datos
    const gameByDB = await Videogame.findOne({
        where: { id: id },
        include: Gender
    })

    if(gameByDB) return gameByDB;

    const { data } = await axios(`${URL_BASE}/games/${id}?key=${KEY}`)

    if (!data) throw new Error('No existe un juego con ese id')

    return objectConstructor(data)
}

module.exports = { getGameById }