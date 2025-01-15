const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require('../middleware/auth');
const LieuModel = require('../model/lieu'); // Import Lieu model
const { addLieu, getLieu, getLieus, updateLieu, deleteLieu } = require('../model/lieu');

// Add Lieu
router.post("/addlieu", isAuthenticated, async (req, res, next) => {
  const { nom, type } = req.body;
  try {
    const insertedId = await addLieu(nom, type);
    res.status(201).json({ id: insertedId, message: 'Lieu added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the lieu' });
  }
});

// Get Lieu by ID
router.post("/getlieu", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const lieu = await LieuModel.getLieu(id);
    res.json(lieu);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the lieu' });
  }
});

// Get all Lieus
router.get("/getlieus", isAuthenticated, async (req, res, next) => {
  try {
    const lieus = await getLieus();
    console.log(lieus)
    res.status(200).json({
        success: true,
        lieus,
      });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the lieus' });
  }
});

// Update Lieu
router.post("/updatelieu", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { nom, type } = req.body;
  try {
    const success = await updateLieu(id, nom, type);
    if (success) {
      res.json({ message: 'Lieu updated successfully' });
    } else {
      res.status(404).json({ error: 'Lieu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the lieu' });
  }
});

// Delete Lieu
router.post("/deletelieu", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const success = await deleteLieu(id);
    if (success) {
      res.json({ message: 'Lieu deleted successfully' });
    } else {
      res.status(404).json({ error: 'Lieu not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the lieu' });
  }
});

module.exports = router;
