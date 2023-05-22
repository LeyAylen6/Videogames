const objectConstructor = (gameData) => {
    let myGenres = gameData.genres || gameData.Genres
    let myPlatforms = Array.isArray(gameData.platforms) ? gameData.platforms.map(platform => platform.platform) : [{ name: gameData.platforms}]

    return {
        id: gameData.id, 
        name: gameData.name,
        description: gameData.description ? gameData.description : null, 
        platforms: myPlatforms,
        image: gameData.background_image || gameData.image, 
        releaseDate: gameData.released || typeof gameData.releaseDate === 'object' ? gameData.releaseDate.toLocaleDateString('en-CA') : 'No tiene fecha' ,
        rating: gameData.rating,
        genres: myGenres,
    }
}

module.exports = { objectConstructor }