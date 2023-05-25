const { Videogame, Genre } = require('../db')
const { videogame_genre } = require('../db')
const { getAllGenres } = require('./getAllGenresController');
const { objectConstructor }= require('./../utils/objectConstructor')

const postGame = async(name, description, platforms, image, releaseDate, rating, genres) => {
    
    let newGame = {
        name: name,
        description: description,
        platforms: platforms
    }

    if(image) {
        let img = image.split('.')
        
        if (img[img.length - 1] === 'jpg' || img[img.length - 1] === 'png' || img[img.length - 1] === 'jpeg') {
            newGame.image = image

        } else newGame.image = 'https://github.com/LeyAylen6/Videogames/blob/develop/client/src/assets/FotoDefaultGames.png?raw=true'
    }

    if (releaseDate) newGame.releaseDate = releaseDate
    if (rating) newGame.rating = rating

    const [game, create] = await Videogame.findOrCreate({
        where: {name: newGame.name},
        default: newGame
    })

    if (!create) throw new Error('El juego ya existe')

    let allGenres = await getAllGenres() 
    
    allGenres = allGenres.filter(genre => {
        for (let i = 0; i < genres.length; i++) {
            if(genre.dataValues.id == genres[i]) return true;
        }
        return false;
    })

    if (allGenres.length == 0) throw new Error('El genero no existe')

    // Relaciona con su genero
    allGenres.forEach(genre => {
        videogame_genre.findOrCreate({
            where: { GenreId: genre.id, VideogameId: game.id }
        })
    })

    const gameWithGenre = await Videogame.findOne({ 
        where: { id: game.id },
        include: Genre
    })

    return objectConstructor(gameWithGenre);
}

module.exports = { postGame }