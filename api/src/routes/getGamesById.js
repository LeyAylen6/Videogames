const getGamesById = require('express').Router();
const { getGameById } = require('../controllers/getGameByIdController');


getGamesById.get('/videogames/:idVideogame', async(req, res) => {
    try {
        const { idVideogame } = req.params;
        const getbyId = await getGameById(idVideogame);

        return res.status(200).json(getbyId);

    } catch(error) {
        return res.status(404).send('No existe un juego con ese id')
    }
    

    // Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
    // El videojuego es recibido por parámetro (ID).
    // Tiene que incluir los datos del género del videojuego al que está asociado.
    // Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.
})
module.exports = getGamesById;