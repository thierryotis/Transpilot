const express = require("express");
const router = express.Router();
const { addProprio, getProprios, getProprio, updateProprio, deleteProprio } = require("../model/proprio");
const {canSecretaire} = require('../middleware/abilities');
const { isAuthenticated } = require("../middleware/auth");

// Add proprio
router.post("/addproprio",isAuthenticated, canSecretaire, async (req, res, next) => {
  try {
    const { nom, cni, phone, type } = req.body;
    const proprioId = await addProprio(nom, cni, phone, type);
    console.log(proprioId, "id du proprio ajouté")
    res.status(201).json({
      success: true,
      message: "Prestataire ajouté avec succès",
      proprioId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a proprio by ID
router.get("/getproprio/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const proprio = await getProprio(id);
    if (proprio) {
      res.status(200).json({
        success: true,
        proprio,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Propriétaire non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Get all proprios
router.get("/getproprios", async (req, res, next) => {
  try {
    const proprios = await getProprios();
    res.status(200).json({
      success: true,
      proprios,
    });
  } catch (error) {
    return next(error);
  }
});

// Update proprio
router.put("/updateproprio/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, cni, phone } = req.body;
    const updated = await updateProprio(id, nom, cni, phone);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Prestataire mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Prestataire non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete proprio
router.delete("/deleteproprio/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProprio(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Prestataire supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Prestataire non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
