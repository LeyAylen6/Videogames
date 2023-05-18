const { Videogame, Genre } = require('../db')
const { videogame_genre } = require('../db')
const { getAllGenres } = require('./getAllGenresController');

const postGame = async(name, description, platform, image, releaseDate, rating, genres) => {
    // Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
    // Toda la información debe ser recibida por body.
    // Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).
    
    let newGame = {
        name: name,
        description: description,
        platform: platform
    }

    if (image) newGame.image = image
    if (releaseDate) newGame.releaseDate = releaseDate
    if (rating) newGame.rating = rating

    const [game, create] = await Videogame.findOrCreate({
        where: newGame,
        default: newGame 
    })

    if (!create) throw new Error('El juego ya existe')

    let allGenres = await getAllGenres() 
    
    allGenres = allGenres.filter(genre => {
        for (let i = 0; i < genres.length; i++) {
            if(genre.dataValues.name == genres[i]) return true;
        }
        return false;
    })

    if (allGenres.length == 0) throw new Error('El genero no existe')

    // Relaciona con su genero
    await videogame_genre.findOrCreate({
        where: { GenreId: allGenres[0].dataValues.id, VideogameId: game.id }
    })

    const gameWithGenre = await Videogame.findOne({ 
        where: { id: game.id },
        include: Genre
    })

    return gameWithGenre;
}

module.exports = { postGame }