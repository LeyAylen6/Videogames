const { Genre } = require('../db');
const axios = require('axios');

const getAllGenres = async() => {
    const { URL_BASE, KEY } = process.env;
    const { data } = await axios(`${URL_BASE}/genres?key=${KEY}`)
    const genresArray = data.results;

    const genresInDB = await Genre.findAll()

    if(genresInDB.length < 1) await Genre.bulkCreate(genresArray, { fields: ['id', 'name'] });

    const newGenres = await Genre.findAll();

    return newGenres;
}

module.exports = { getAllGenres }

// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
