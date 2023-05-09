const addGame = require('express').Router();
const postGame = require('../controllers/postGameController')

addGame.post('/videogames', (req, res) => {
    // Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
    // Toda la información debe ser recibida por body.
    // Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).

    try {
        const { id, name, description, platform, image, releaseDate, rating, gender } = req.body

        if (!id || !name || !description || !platform || !image || !releaseDate || !rating || !gender) {
            throw new Error('Faltan datos')
        }

        const addnewGame = postGame(id, name, description, platform, image, releaseDate, rating, gender)
    
        return res.status(201).json(addnewGame);

    } catch(error) {
        res.status(400).send(error.message);
    }
}),

module.exports = addGame;




