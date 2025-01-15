const express = require("express");
const router = express.Router();
const { addChauffeur, getChauffeurs, getChauffeurById, updateChauffeur, deleteChauffeur } = require("../model/chauffeur");
const {isAuthenticated} = require('../middleware/auth')
const {canSecretaire} = require('../middleware/abilities')

// Add chauffeur
router.post("/addchauffeur",isAuthenticated, async (req, res, next) => {
  try {
    const { nom, phone, cni, proprioId } = req.body;
    const chauffeurId = await addChauffeur(nom, phone, cni, proprioId);
    res.status(201).json({
      success: true,
      message: "Chauffeur ajouté avec succès",
      chauffeurId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all chauffeurs
router.get("/getchauffeurs", isAuthenticated,  async (req, res, next) => {
  try {
    const chauffeurs = await getChauffeurs();
    res.status(200).json({
      success: true,
      chauffeurs,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a chauffeur by ID
router.get("/getchauffeur/:id",isAuthenticated,  async (req, res, next) => {
  try {
    const { id } = req.params;
    const chauffeur = await getChauffeurById(id);
    if (chauffeur) {
      res.status(200).json({
        success: true,
        chauffeur,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chauffeur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update chauffeur
router.post("/updatechauffeur/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, phone, cni } = req.body;
    const updated = await updateChauffeur(id, nom, phone, cni);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Chauffeur mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chauffeur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete chauffeur
router.delete("/deletechauffeur/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteChauffeur(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Chauffeur supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chauffeur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
