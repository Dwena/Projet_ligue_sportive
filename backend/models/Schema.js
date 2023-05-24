const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        title: String,
        year: String,
        runtime: String,
        genres: [String],
        director: String,
        actors: String,
        plot: String,
        posterUrl: String,
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;