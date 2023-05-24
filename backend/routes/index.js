const express = require('express');
const router = express.Router();
const Movie = require('../models/Schema');
const mongoose = require('mongoose');
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/movies/:title', async (req, res) => {
    try {
        const movie = await Movie.findOne({title: req.params.title});
        res.json(movie);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/add-movies', async (req, res) => {

        const movie = new Movie({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            year: req.body.year,
            runtime: req.body.runtime,
            genres: req.body.genres,
            director: req.body.director,
            actors: req.body.actors,
            plot: req.body.plot,
            posterUrl: req.body.posterUrl,
        });
        try {
            await movie.save();
            res.status(201).json({message: 'Movie added'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
);

router.put('/movies/:id', async (req, res) => {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(movie);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
);

router.delete('/movies/:id', async (req, res) => {
        try {
            await Movie.findByIdAndRemove(req.params.id, req.body);
            res.json({message: 'Movie deleted'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
);


module.exports = router;
