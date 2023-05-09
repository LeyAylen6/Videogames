const axios = require('axios');

const getAllGames = async() => {
    const { URL_BASE, KEY } = process.env;

    const { data } = await axios(`${URL_BASE}/games?key=${KEY}`)

    return data.results;
};

module.exports = { getAllGames }
