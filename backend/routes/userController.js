const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');


router.post('/resetPassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const updatedUser = await User.updateOne(
            { email },
            { $set: { password: newPassword } }
        );

        if(updatedUser.nModified > 0) {
            res.status(200).json({message: "Password updated successfully!"});
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


module.exports = router;


// Créer un nouvel utilisateur (sign up)
router.post('/register', async (req, res) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password,
        administrator : req.body.administrator ,
        cart : req.body.cart
    });

    try {
        const users = await user.save();
        res.status(200).json(users);
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

// Login users
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({user:user});
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
                administrator : req.body.administrator,
                cart : req.body.cart
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

// Ajouter un produit au panier de l'utilisateur

// Ajouter un produit au panier de l'utilisateur
router.post('/:id/cart', (req, res) => {
    const { id } = req.params;
    const { product, title, price, img, quantity, description, category } = req.body;
    User.findById(id)
      .then(user => {
        // Vérifier si le produit est déjà dans le panier de l'utilisateur
        const cartItem = user.cart.find(item => item.product.toString() === product);
        if (cartItem) {
          // Si le produit est déjà dans le panier, mettre à jour la quantité
          cartItem.quantity += quantity;
        } else {
          // Si le produit n'est pas dans le panier, l'ajouter avec la quantité spécifiée
          user.cart.push({ product, title, price, img, quantity, description, category});
        }
  
        user.save()
          .then(() => {
            res.send('Le produit a été ajouté au panier avec succès.');
        }).catch(err=>{
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de la sauvegarde de l\'utilisateur.');
          });
    }).catch(err=>{
        console.error(err);
        return res.status(500).send('Une erreur est survenue lors de la recherche de l\'utilisateur.');
      });
  });
  
  // Valider le panier de l'utilisateur
  router.post('/:id/cart/validate', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // Réduire la quantité de chaque produit dans le panier
        for (const item of user.cart) {
            await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
        }

        // Vider le panier de l'utilisateur
        user.cart = [];

        await user.save();
        
        return res.status(200).send('Validation du panier réussie.');
    } catch (err) {
        console.error(err);
        return res.status(500).send('Une erreur est survenue lors de la validation du panier.');
    }
});

    
module.exports = router;