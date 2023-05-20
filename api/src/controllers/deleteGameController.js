const { Videogame, Genre } = require("../db");

const deleteGameById = async(id) => {

    const gameById = await Videogame.findOne({
        where: { id: id },
        include: Genre
    })

    if(!gameById) throw new Error('El juego no existe')

    await Videogame.destroy({
        where: { id: id },
        include: Genre
    })

    return gameById;

}

module.exports = deleteGameById;