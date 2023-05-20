const updateGameRouter = require('express').Router();
const updateGame = require('../controllers/updateGameController')

updateGameRouter.put('/videogames/:id', async (req, res) => {
    try {
        const { id } = req.params;
        var game = req.body;

        const gameUpdate = await updateGame(id, game);
        return res.status(200).json(gameUpdate)
        
    } catch(error) {
        res.status(404).send(error.message)
    }
})

module.exports = updateGameRouter;
