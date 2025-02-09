const express = require("express");
const router = express.Router();
const { addDechargement, getDechargements, getDechargementById, updateDechargement, deleteDechargement } = require("../model/dechargement");
const {canDechargement} = require('../middleware/abilities')
const {isAuthenticated} = require('../middleware/auth')
const jwt = require("jsonwebtoken");



// Add dechargement
router.post("/adddechargement",isAuthenticated, canDechargement,  async (req, res, next) => {
  try {
    const { numero_bordereau, numero_bon_commande, etat_camion, date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id, operateur_id, commentaire, dateEnregistrement} = req.body;
    console.table(req.body)
    let formattedDate = new Date(date);
    let dateEnreg = new Date (dateEnregistrement)
    formattedDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');
    dateEnreg = dateEnreg.toISOString().slice(0, 19).replace('T', ' ');
    
    const dechargementId = await addDechargement(numero_bordereau, numero_bon_commande, etat_camion, formattedDate,lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement, chargement_id, operateur_id, commentaire, dateEnreg);
    res.status(201).json({
      success: true,
      message: "Déchargement ajouté avec succès",
      dechargementId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all dechargements
// Get all dechargements with pagination
router.get("/getdechargements", isAuthenticated, async (req, res, next) => {
  try {
    // Récupérer les paramètres de pagination depuis la requête
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 100

    // Appeler le modèle avec les paramètres de pagination
    const { dechargements, total } = await getDechargements(page, limit);

    res.status(200).json({
      success: true,
      dechargements,
      total
    });
  } catch (error) {
    return next(error);
  }
});

// Get a dechargement by ID
router.get("/getdechargement/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const dechargement = await getDechargementById(id);
    if (dechargement) {
      res.status(200).json({
        success: true,
        dechargement,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update dechargement
router.post("/updatedechargement/:id",isAuthenticated, canDechargement,  async (req, res, next) => {
  try {
    const { id } = req.params;
    const operateur_id = req.user.userId
    console.log('user id', operateur_id)
    const { numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id } = req.body;
    const updated = await updateDechargement(id, numero_bordereau, numero_bon_commande, etat_camion,date, lieu_dechargement, poids_camion_decharge, poids_camion_apres_chargement,  chargement_id, operateur_id);
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Déchargement mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete dechargement
router.delete("/deletedechargement/:id",isAuthenticated, canDechargement, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteDechargement(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Déchargement supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Déchargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
