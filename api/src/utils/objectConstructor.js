const objectConstructor = (gameData) => {
    return {
        id: gameData.id, 
        name: gameData.name,
        description: gameData.description ? gameData.description : null, 
        platforms: gameData.platforms.map(platform => platform.platform),
        image: gameData.background_image, 
        releaseDate: gameData.released,
        rating: gameData.rating,
        genres: gameData.genres
    }
}

module.exports = { objectConstructor }