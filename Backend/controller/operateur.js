const express = require("express");
const router = express.Router();
const { addOperateur, getOperateurs, getOperateurById, updateOperateur, deleteOperateur } = require("../model/operateur");
const {isAuthenticated} = require('../middleware/auth')
const {canSecretaire} = require('../middleware/abilities')

// Add operateur
router.post("/addoperateur",isAuthenticated, async (req, res, next) => {
  try {
    const { nom, phone, cni } = req.body;
    const operateurId = await addOperateur(nom, phone, cni);
    res.status(201).json({
      success: true,
      message: "Operateur ajouté avec succès",
      operateurId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all operateurs
router.get("/getoperateurs", isAuthenticated,  async (req, res, next) => {
  try {
    const operateurs = await getOperateurs();
    res.status(200).json({
      success: true,
      operateurs,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a operateur by ID
router.get("/getoperateur/:id",isAuthenticated,  async (req, res, next) => {
  try {
    const { id } = req.params;
    const operateur = await getOperateurById(id);
    if (operateur) {
      res.status(200).json({
        success: true,
        operateur,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Operateur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update operateur
router.put("/updateoperateur/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, phone, cni } = req.body;
    const updated = await updateOperateur(id, nom, phone, cni);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Operateur mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Operateur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete operateur
router.delete("/deleteoperateur/:id",isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteOperateur(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Operateur supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Operateur non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
