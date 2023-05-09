const { Videogame } = require('../db')
const { videogame_gender } = require('../db')
const { getAllGenres } = require('./getAllGenresController');

const postGame = async(id, name, description, platform, image, releaseDate, rating, genres) => {
    // Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
    // Toda la información debe ser recibida por body.
    // Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
    
    let newGame = {
        name: name,
        description: description,
        platform: platform,
        image: image,
        releaseDate: releaseDate,
        rating: rating
    }

    const [game, create] = await Videogame.findOrCreate({
        where: newGame,
        default: newGame
    })

    if (!create) throw new Error('El juego ya existe')

    const getGenres = await getAllGenres();

    // AQUÍ relacionar con sus géneros indicados
    const [gameWithGender, created] = await videogame_gender.findOrCreate({
        where: { GenderId: id, VideogameId: id }
    })

    // Buscar en los generos que hay el que tenga name == gender parametro. Reultiliza la func de get genders


    return game;
}

module.exports = { postGame }