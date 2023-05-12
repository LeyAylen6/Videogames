const { Videogame } = require('../db')
const { videogame_gender } = require('../db')
const { Gender } = require('../db')
const { getAllGenres } = require('./getAllGenresController');

const postGame = async(name, description, platform, image, releaseDate, rating, genres) => {
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

    let allGenres = await getAllGenres() 
    allGenres = allGenres.filter(genre => genre.dataValues.name == genres)

    if (allGenres.length == 0) throw new Error('El genero no existe')

    // Relaciona con su genero
    await videogame_gender.findOrCreate({
        where: { GenderId: allGenres[0].dataValues.id, VideogameId: game.id }
    })

    const gameWithGender = await Videogame.findAll({ 
        where: { id: game.id },
        include: Gender
    })

    return gameWithGender;
}

module.exports = { postGame }