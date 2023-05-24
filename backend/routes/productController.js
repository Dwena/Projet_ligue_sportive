const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');
router.get('/products', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/product/:title', async (req, res) => {
    try {
        const product = await Product.findOne({title: req.params.title});
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/add-product', async (req, res) => {

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            price : req.body.price,
            img :req.body.img,
            description : req.body.description,
            category : req.body.category
        });
        try {
            await product.save();
            res.status(201).json({message: 'Product added'});
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
);

router.put('/product/:id', async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.json(product);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
);

router.delete('/product/:id', async (req, res) => {
        try {
            await Product.findByIdAndRemove(req.params.id, req.body);
            res.json({message: 'Product deleted'});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
);


module.exports = router;
