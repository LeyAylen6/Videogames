const axios = require('axios');
const { objectConstructor } = require('./../utils/objectConstructor')

const getAllGames = async() => {
    const { URL_BASE, KEY } = process.env;

    const { data } = await axios(`${URL_BASE}/games?key=${KEY}`)

    return data.results.map(game => objectConstructor(game)); //ANOTAR QUE HICE ACA
};

module.exports = { getAllGames }
