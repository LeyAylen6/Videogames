const deleteGame = require('express').Router();
const deleteGameById = require('./../controllers/deleteGameController')

deleteGame.delete('/videogames/:id', async(req,res) => {
    try {
        const { id } = req.params;
        
        return res.status(200).json(deleteGameById(id))
        
    } catch(error) {
        if (error.message === 'El juego no existe') {
            return res.status(404).send(error.message)
        }
        return res.status(500).send(error.message)
    }
});

module.exports = deleteGame;
