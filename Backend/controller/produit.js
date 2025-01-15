const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middleware/auth');
const ProduitModel = require('../model/produit'); // Import du modèle Produit
const { addProduit, getProduit, getProduits, updateProduit, deleteProduit } = require('../model/produit');

// Add produit
router.post("/addproduit", isAuthenticated, async (req, res, next) => {
  const { nom, type } = req.body;
  try {
    const insertedId = await addProduit(nom, type);
    res.status(201).json({ id: insertedId, message: 'Produit added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the produit' });
  }
});

// Get produit by ID
router.post("/getproduit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const produit = await ProduitModel.getProduit(id);
    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the produit' });
  }
});

// Get all produits
router.get("/getproduits", isAuthenticated, async (req, res, next) => {
  try {
    const produits = await getProduits();
    res.status(200).json({
      success: true,
      produits,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the produits' });
  }
});

// Update produit
router.post("/updateproduit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { nom, type } = req.body;
  try {
    const success = await updateProduit(id, nom, type);
    if (success) {
      res.json({ message: 'Produit updated successfully' });
    } else {
      res.status(404).json({ error: 'Produit not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the produit' });
  }
});

// Delete produit
router.post("/deleteproduit", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await deleteProduit(id);
    if (success) {
      res.json({ message: 'Produit deleted successfully' });
    } else {
      res.status(404).json({ error: 'Produit not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the produit' });
  }
});

module.exports = router;
