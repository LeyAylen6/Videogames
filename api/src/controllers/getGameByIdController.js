const { Videogame } = require('../db')
const { Gender } = require('../db')
const { getAllGames } = require('./getAllGamesController')
const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getGameById = async(id) => {
    
    const { URL_BASE, KEY } = process.env;
    
    // Necesitamos el if para que no busque en DB un tipo de dato que no existe como UUID
    if (typeof(id) !== 'string' ) { 
        const gameByDB = await Videogame.findOne({
            where: { id: id },
            include: Gender
        })
        
        if(gameByDB) return gameByDB;
        else throw new Error('No existe un juego con ese id')
    }

    const { data } = await axios(`${URL_BASE}/games/${id}?key=${KEY}`) // ver xq es un string los id de la api

    if (!data) throw new Error('No existe un juego con ese id')
    console.log(objectConstructor(data))
    return objectConstructor(data)
}

module.exports = { getGameById }