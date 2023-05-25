const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
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
        administrator : req.body.administrator ,
        cart : req.body.cart
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

// Login users
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Logged in successfully' });
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
router.post('/:id/cart', (req, res) => {
    const { id } = req.params;
    const { product, quantity } = req.body;
  
    User.findById(id).then(user=>{
        user.cart.push({ product: product, quantity });
        user.save().then(()=>{
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
  router.post('/:id/cart/validate', (req, res) => {
    const { id } = req.params;
    User.findById(id).then(user=>{
          // Réduire la quantité de chaque produit dans le panier
          user.cart.forEach((item) => {
            Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } }).catch
            ((err) => {
                console.error(err);
                return res.status(500).send('Une erreur est survenue lors de la mise à jour de la quantité de produits.');
                }
            );
          });
      
          // Vider le panier de l'utilisateur
          user.cart = [];
      
          user.save().then().catch((err) => {
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de la sauvegarde de l\'utilisateur.');
          }
            );
        }).catch((err)=>{
            console.error(err);
            return res.status(500).send('Une erreur est survenue lors de la recherche de l\'utilisateur.');
        })
    });

    


    // User.findById(id, (err, user) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send('Une erreur est survenue lors de la recherche de l\'utilisateur.');
    //   }
  
    //   // Réduire la quantité de chaque produit dans le panier
    //   user.cart.forEach((item) => {
    //     Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } }, (err) => {
    //       if (err) {
    //         console.error(err);
    //         return res.status(500).send('Une erreur est survenue lors de la mise à jour de la quantité du produit.');
    //       }
    //     });
    //   });
  
    //   // Vider le panier de l'utilisateur
    //   user.cart = [];
  
    //   user.save((err) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send('Une erreur est survenue lors de la sauvegarde de l\'utilisateur.');
    //     }
  
    //     res.send('Le panier a été validé avec succès.');
    //   });
    // });
//   });
  

module.exports = router;