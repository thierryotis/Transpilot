const express = require("express");
const router = express.Router();
const { addCamion, getCamions,getAllCamions, getCamionById, updateCamion, deleteCamion } = require("../model/camion");
const {isAuthenticated} = require('../middleware/auth')
const {canSecretaire} = require('../middleware/abilities')

// Add camion
router.post("/addcamion", isAuthenticated, canSecretaire, async (req, res, next) => {
  try {
    
    const {immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId} = req.body;
    // Assuming you have the addCamion function defined somewhere
    const camionId = await addCamion(immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId);

    res.status(201).json({
      success: true,
      message: "Camion ajouté avec succès",
      camionId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all camions for a given prestataire
router.post("/getcamions", isAuthenticated,  async (req, res, next) => {
  try {
    const {prestataire_id} = req.body
    const camions = await getCamions(prestataire_id);
    res.status(200).json({
      success: true,
      camions,
    });
  } catch (error) {
    return next(error);
  }
});
// Get all camions
router.get("/getallCamions", isAuthenticated,  async (req, res, next) => {
  try {
    const camions = await getAllCamions();
    res.status(200).json({
      success: true,
      camions,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a camion by ID
router.get("/getcamion/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const camion = await getCamionById(id);
    if (camion) {
      res.status(200).json({
        success: true,
        camion,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Véhicule non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update camion
router.post("/updatecamion/:id",isAuthenticated,canSecretaire, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId} = req.body;
    // Assuming you have the addCamion function defined somewhere
    const camionId = await updateCamion(id, immatTracteur,immatBenne,PVTracteur,PVBenne,etatTracteur,etatBenne,proprioId);
    if (camionId) {
      res.status(200).json({
        success: true,
        message: "Camion mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Camion non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete camion
router.delete("/deletecamion/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCamion(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Camion supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Camion non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
