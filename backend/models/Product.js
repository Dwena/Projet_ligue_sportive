const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
        _id: mongoose.Types.ObjectId,
        title: String,
        price: Number,
        img: String,
        quantity : Number,
        description: String,
        category: [String]
    }
);

const Product = mongoose.model('Products', productSchema);

module.exports = Product;