const getGenres = require('express').Router();
const { getAllGenres } = require('../controllers/getAllGenresController')

getGenres.get('/genres', async(req, res) => {

    try {
        const AllGenres = await getAllGenres()

        res.status(200).json(AllGenres);

    } catch (error) {
        res.status(500).send(error.message);
    }

})
module.exports = getGenres;