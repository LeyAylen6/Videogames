const getGames = require('express').Router();
const { getAllGames } = require('./../controllers/getAllGamesController')
const { getGamesByName } = require('./../controllers/getGamesByName')

// !Uso misma ruta para /videogames tanto si tiene query como si no. Ejecuta distinta funcion dependiendo si tiene o no

getGames.get('/videogames', async(req, res) => {
    try {
        const { name } = req.query;

        if(name) {
            const gameByName = await getGamesByName(name);
            return res.status(200).json(gameByName)
        }

        const getGames = await getAllGames();
        return res.status(200).json(getGames)
    
    } catch(error) {
        if( error.message === 'No existe un video juego con el nombre solicitado') {
            return res.status(404).send(error.message);
        }
        return res.status(500).send(error.message)
    }
})

module.exports = getGames;
