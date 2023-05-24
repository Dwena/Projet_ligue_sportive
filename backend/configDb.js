const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function connectDb() {
    mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connexion à la base de données réussie');
        })
        .catch((error) => {
            console.error('Erreur de connexion à la base de données :', error);
        });
}

module.exports = connectDb;