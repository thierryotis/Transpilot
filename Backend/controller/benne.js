const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middleware/auth');
const BenneModel = require('../model/benne'); // Import du modèle Benne
const { addBenne, getBenne, getBenneByPrestataire, getBennes, updateBenne, deleteBenne } = require('../model/benne');

// Add benne
router.post("/addbenne", isAuthenticated,   async (req, res, next) => {
  const { immat, proprio_id } = req.body;
  try {
    const insertedId = await addBenne(immat, proprio_id);
    res.status(201).json({ id: insertedId, message: 'Benne added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the benne' });
  }
});

// Get benne by ID
router.get("/getbenne", isAuthenticated,   async (req, res, next) => {
  const { id } = req.params;
  try {
    const benne = await BenneModel.getBenne(id);
    res.json(benne);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the benne' });
  }
});

// Get all bennes
router.get("/getbennes", isAuthenticated,   async (req, res, next) => {
  try {
    const bennes = await getBennes();
    res.status(200).json({
      success: true,
      bennes,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bennes' });
  }
});

// Get bennes by prestataire (proprio_id)
router.get("/getbennebyprestataire/:proprio_id",   async (req, res, next) => {
  const { proprio_id } = req.params;
  try {
    const bennes = await getBenneByPrestataire(proprio_id);
    res.status(200).json({
      success: true,
      bennes,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the bennes' });
  }
});

// Update benne
router.post("/updatebenne", isAuthenticated,   async (req, res, next) => {
  const { id } = req.params;
  const { immat, proprio_id } = req.body;
  try {
    const success = await updateBenne(id, immat, proprio_id);
    if (success) {
      res.json({ message: 'Benne updated successfully' });
    } else {
      res.status(404).json({ error: 'Benne not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the benne' });
  }
});

// Delete benne
router.post("/deletebenne", isAuthenticated,   async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await deleteBenne(id);
    if (success) {
      res.json({ message: 'Benne deleted successfully' });
    } else {
      res.status(404).json({ error: 'Benne not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the benne' });
  }
});

module.exports = router;
