const addGame = require('express').Router();
const { postGame } = require('../controllers/postGameController')

addGame.post('/videogames', async(req, res) => {
    try {
        const { name, description, platforms, image, releaseDate, rating, genre } = req.body

        if ( !name || !description || !platforms || !rating || !genre) { // image tiene valor por default
            throw new Error('Faltan datos')
        }

        const addnewGame = await postGame( name, description, platforms, image, releaseDate, rating, genre)
    
        return res.status(201).json(addnewGame);

    } catch(error) {
        if (error.message == 'El genero no existe') {
            return res.status(404).send(error.message);
        }
        return res.status(400).send(error.message);
    }
}),

module.exports = addGame;




