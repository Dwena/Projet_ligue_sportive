const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        firstname: String,
        lastname: String,
        phone: String,
        email: String,
        password: String,
        administrator: Boolean 
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;