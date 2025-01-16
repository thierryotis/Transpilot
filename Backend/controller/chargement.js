const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { addChargement, getChargements, getChargementById, updateChargement, deleteChargement, getUndechargedChargements } = require("../model/chargement");
const {getDechargementByChargement} = require('../model/dechargement')
const {isAuthenticated} = require('../middleware/auth')
const {canChargement} = require('../middleware/abilities')

// Add chargement
router.post("/addchargement", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    console.log(req.body)
    const token = req.headers.authorization?.split(' ')[1];
    const { numero_chargement, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_vide, poids_camion_charge,chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id } = req.body;
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    console.log({decodedToken})
    
    const operateur_id = decodedToken.userId;
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');
    const chargementId = await addChargement(numero_chargement, numero_bordereau, numero_bon_commande, formattedDate, lieu,poids_camion_vide, poids_camion_charge,operateur_id, chauffeur_id,immatTracteur,immatBenne,type_produit_id, prestataire_id,client_id );
    res.status(201).json({
      success: true,
      message: "Chargement ajouté avec succès",
      chargementId,
    });
  } catch (error) {
    return next(error);
  }
});

// Get all chargements
router.get("/getchargements", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    // Récupère page et limit depuis les paramètres de requête
    const page = parseInt(req.query.page, 10) || 1; // Par défaut : page 1
    const limit = parseInt(req.query.limit, 10) || 20; // Par défaut : 20 éléments par page

    // Appelle la fonction du modèle avec pagination
    const { chargements, total } = await getChargements(page, limit);

    // Retourne les données avec la pagination
    res.status(200).json({
      success: true,
      chargements,
      total, // Nombre total d'enregistrements
      page,  // Page actuelle
      limit, // Limite par page
    });
  } catch (error) {
    return next(error);
  }
});


// Get all the chargements that has not chargements
router.get("/getundechargedchargements", isAuthenticated, canChargement, async (req, res, next) => {
  try {
    const chargements = await getUndechargedChargements();
    res.status(200).json({
      success: true,
      chargements,
    });
  } catch (error) {
    return next(error);
  }
});

// Get a chargement by ID
router.get("/getchargement/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const chargement = await getChargementById(id);
    if (chargement) {
      res.status(200).json({
        success: true,
        chargement,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Update chargement
router.post("/updatechargement/:id", isAuthenticated, canChargement,async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log(req.user.userId, ' from updatechargement method')
    //check if the given chargement has already a dechargement
    if(!getDechargementByChargement(id)){
      //the dechargement has been made
      res.status(200).json({
        success: false,
        message: "Le chargement selectionné ne peut plus être modifié",
      });
    }
    const operateur_id = req.user.userId
    const { numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge,chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id } = req.body
    let formattedDate = new Date(date);
    formattedDate = formattedDate.toISOString().slice(0, 19).replace('T', ' ');
    const updated = await updateChargement(id, numero_bordereau, numero_bon_commande, formattedDate, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id    );
    
    if (updated) {
      res.status(200).json({
        success: true,
        message: "Chargement mis à jour avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Delete chargement
router.delete("/deletechargement/:id", isAuthenticated,canChargement, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await deleteChargement(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "Chargement supprimé avec succès",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Chargement non trouvé",
      });
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
