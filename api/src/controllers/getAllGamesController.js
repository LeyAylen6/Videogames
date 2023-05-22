const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')
const { Videogame, Genre } = require('./../db');

const getAllGames = async() => {
    const { URL_BASE, KEY } = process.env;

    const gamesByDB = await Videogame.findAll({
        include: Genre
    })

    let count = 1;
    let dataFound = [];

    while (count < 4) {
        const { data } = await axios(`${URL_BASE}/games?page_size=34&key=${KEY}&page=${count}`)
        dataFound = [...dataFound, ...data.results]
        count ++
    }
    
    let result = dataFound; 

    return [...gamesByDB, ...result].map(game => objectConstructor(game))
};

module.exports = { getAllGames }
