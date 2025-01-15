const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {isAuthenticated} = require('../middleware/auth')
const { addTracteur, getTracteur, getTracteurByPrestataire, getTracteurs, updateTracteur, deleteTracteur } = require( '../model/tracteur');

// Add tracteur
router.post("/addtracteur", isAuthenticated, async (req, res, next) => {
  const { immat, proprio_id } = req.body;
  try {
    const insertedId = await addTracteur(immat, proprio_id);
    res.status(201).json({ id: insertedId, message: 'Tracteur added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the tracteur' });
  }
});

// Get tracteur by ID
router.post("/gettracteur", isAuthenticated,  async (req, res, next) => {
  const { id } = req.params;
  try {
    const tracteur = await getTracteur(id);
    res.json(tracteur);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the tracteur' });
  }
});

// Get all tracteurs
router.get("/gettracteurs", isAuthenticated,  async (req, res, next) => {
  try {
    const tracteurs = await getTracteurs();
    res.status(200).json({
      success: true,
      tracteurs,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the tracteurs' });
  }
});

// Get tracteurs by prestataire (proprio_id)
router.get("/gettracteurbyprestataire/:proprio_id",   async (req, res, next) => {
  const { proprio_id } = req.params;
  try {
    const tracteurs = await getTracteurByPrestataire(proprio_id);
    res.status(200).json({
      success: true,
      tracteurs,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the tracteurs' });
  }
});

// Update tracteur
router.post("/updatetracteur", isAuthenticated,   async (req, res, next) => {
  const { id } = req.params;
  const { immat, proprio_id } = req.body;
  try {
    const success = await updateTracteur(id, immat, proprio_id);
    if (success) {
      res.json({ message: 'Tracteur updated successfully' });
    } else {
      res.status(404).json({ error: 'Tracteur not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the tracteur' });
  }
});

// Delete tracteur
router.post("/deletetracteur", isAuthenticated,   async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await deleteTracteur(id);
    if (success) {
      res.json({ message: 'Tracteur deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tracteur not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the tracteur' });
  }
});

module.exports = router;
