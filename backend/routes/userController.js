const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');


// Créer un nouvel utilisateur (sign up)
router.post('/register', async (req, res) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password,
        administrator : req.body.administrator 
    });

    try {
        await user.save();
        res.status(201).json({message: "User was registered successfully!"})
    } catch(error){
        res.status(400).json({message : error.message})

    }});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// Lire les détails d'un utilisateur
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: "User not found"})
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.id }, 
            { $set: {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                phone : req.body.phone,
                email : req.body.email,
                password : req.body.password,
                administrator : req.body.administrator
            }}
        );
        if(updatedUser.nModified > 0) {
            res.status(200).json({message: "User updated successfully!"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.id });
        if(removedUser.deletedCount > 0) {
            res.status(200).json({message: "User deleted successfully!"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;