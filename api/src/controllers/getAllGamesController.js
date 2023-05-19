const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getAllGames = async() => {
    const { URL_BASE, KEY } = process.env;

    let count = 1;
    let dataFound = [];

    while (count < 4) {
        const { data } = await axios(`${URL_BASE}/games?page_size=34&key=${KEY}&page=${count}`)
        dataFound = [...dataFound, ...data.results]
        count ++
    }
     // Paginado desde back. page_size=15
    console.log( dataFound)
    return dataFound.map(game => objectConstructor(game)); 
};

module.exports = { getAllGames }
