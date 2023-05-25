const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        firstname: String,
        lastname: String,
        phone: String,
        email: String,
        password: String,
        administrator: {type : Boolean, default:false}, 
        cart: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
          }]
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;