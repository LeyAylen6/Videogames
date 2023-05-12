const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getAllGames = async() => {
    const { URL_BASE, KEY } = process.env;

    const { data } = await axios(`${URL_BASE}/games?page_size=15&key=${KEY}`) // Paginado desde back. page_size=15
 
    return data.results.map(game => objectConstructor(game)); 
};

module.exports = { getAllGames }
