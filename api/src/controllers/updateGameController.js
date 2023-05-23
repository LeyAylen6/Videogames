const { videogame_genre, Videogame, Genre } = require('./../db')
const { objectConstructor } = require('./../utils/objectConstructor')

const updateGame = async(id, game) => {

    const gameByDB = await Videogame.findOne({
        where: { id: id },
        include: Genre
    })
    // gameByDB.dataValues.Genres[0].dataValues.name --> Nombre del genero en [0]

    if(!gameByDB) throw new Error('El juego que esta buscando no existe')

    const gameDB = gameByDB.dataValues

    gameDB.name = game.name || gameDB.name
    gameDB.description = game.description || gameDB.description
    gameDB.platforms = game.platforms || gameDB.platforms
    gameDB.image = game.image || gameDB.image
    gameDB.releaseDate = game.releaseDate || gameDB.releaseDate
    gameDB.rating = game.rating || gameDB.rating

    await Videogame.update(gameDB, {
        where: { id: id }
      });

    // ? Agregar nuevos genres
    game.genre.forEach(async (id) => {
        await videogame_genre.findOrCreate({
            where: { GenreId: id, VideogameId: gameDB.id }
        })
    })

    // ? Eliminar los viejos genres

    let genresToDelete = [];

    // Busco los generos a eliminar
    for(let i = 0; i < gameDB.Genres.length; i++) {

        let isInclude = game.genre.includes(gameDB.Genres[i].dataValues.id) 

        if(!isInclude) genresToDelete.push(gameDB.Genres[i].dataValues.id) 
    }

    genresToDelete.forEach(id => {
        videogame_genre.destroy({
            where: { GenreId: id, VideogameId: gameByDB.id }
        })
    })

    let gameByDBWhitGenre = await Videogame.findOne({
        where: { id: id },
        include: Genre
    })

    return objectConstructor(gameByDBWhitGenre);
}

module.exports = updateGame;