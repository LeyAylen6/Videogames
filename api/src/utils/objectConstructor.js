const objectConstructor = (gameData) => {
    return {
        id: gameData.id, 
        name: gameData.name,
        description: gameData.description,
        platform: gameData.platforms,
        image: gameData.background_image, 
        releaseDate: gameData.released,
        rating: gameData.rating,
        genre: gameData.genres
    }
}

module.exports = { objectConstructor }