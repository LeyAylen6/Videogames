const { Videogame } = require('../db')
const { Genre } = require('../db')
const { getAllGames } = require('./getAllGamesController')
const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getGameById = async(id) => {
    
    try {
        const gameByDB = await Videogame.findOne({
            where: { id: id },
            include: Genre
        })
        
        return objectConstructor(gameByDB);

    } catch(error) {

        const { URL_BASE, KEY } = process.env;
        const { data } = await axios(`${URL_BASE}/games/${id}?key=${KEY}`) // ver xq es un string los id de la api
 
        if (!data) throw new Error('No existe un juego con ese id')
        return objectConstructor(data)
    }
}

module.exports = { getGameById }