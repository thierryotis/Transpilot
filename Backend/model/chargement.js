const connectDatabase = require('../db/Database_online');

// Add chargement
const addChargement = async (numero_chargement, numero_bordereau, numero_bon_commande, date, lieu,poids_camion_vide, poids_camion_charge,operateur_id, chauffeur_id,immatTracteur,immatBenne,type_produit_id, prestataire_id,client_id ) => {
  try {
    const connection = await connectDatabase();
    const query = "INSERT INTO chargements ( numero_chargement, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_vide, poids_camion_charge,   operateur_id, chauffeur_id, immatTracteur, immatBenne,  type_produit_id, prestataire_id, client_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await connection.query(query, [ numero_chargement, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_vide, poids_camion_charge,   operateur_id, chauffeur_id, immatTracteur, immatBenne, type_produit_id, prestataire_id, client_id ]);
    connection.end(); // Close the connection after query execution
    return result.insertId;
  } catch (error) {
    console.error("Erreur lors de l'ajout du chargement : ", error);
    throw error;
  }
};

// Get chargement by ID
const getChargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM chargements WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};

const getChargements = async (page = 1, limit = 20) => {
  try {
    const offset = (page - 1) * limit;
    const connection = await connectDatabase();

    // Requête pour compter le nombre total d'enregistrements
    const totalQuery = "SELECT COUNT(*) as total FROM chargements";
    const [totalRows] = await connection.query(totalQuery);
    const total = totalRows[0].total;

    // Requête pour récupérer les données paginées
    const query = `
      SELECT c.*, 
        ch.nom as chauffeur_nom, 
        tr.immat as tracteur_immat, 
        bn.immat as benne_immat, 
        p.nom as produit_nom, 
        u.nom as user_nom, 
        pr.nom as prestataire_nom,
        l.nom AS lieu_nom
      FROM chargements c
      JOIN chauffeurs ch ON c.chauffeur_id = ch.id
      JOIN tracteurs tr ON c.immatTracteur = tr.immat
      JOIN bennes bn ON c.immatBenne = bn.immat
      JOIN produits p ON c.type_produit_id = p.id
      JOIN users u ON c.operateur_id = u.id
      JOIN proprios pr ON c.prestataire_id = pr.id
      JOIN lieux l ON c.lieu = l.id
      LIMIT ? OFFSET ?;
    `;
    const [rows] = await connection.query(query, [limit, offset]);
    connection.end();

    return { chargements: rows, total };
  } catch (error) {
    throw error;
  }
};

// Update chargement
const updateChargement = async (id, numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id  ) => {
  try {
    const connection = await connectDatabase();
    const query = "UPDATE chargements SET numero_bordereau = ?, numero_bon_commande = ?, date = ?, lieu = ?, poids_camion_charge = ?,  chauffeur_id = ?, immatTracteur = ?, immatBenne = ?, type_produit_id = ?,operateur_id = ?, prestataire_id = ?, client_id = ?  WHERE id = ?";
    const [result] = await connection.query(query, [numero_bordereau, numero_bon_commande, date, lieu, poids_camion_charge, chauffeur_id,immatTracteur, immatBenne, type_produit_id, operateur_id, prestataire_id, client_id , id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};


// Delete chargement
const deleteChargement = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "DELETE FROM chargements WHERE id = ?";
    const [result] = await connection.query(query, [id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

//Get the undecharged chargements : the chargements that has not yet been decharged

const getUndechargedChargements = async () => {
  try {
    const connection = await connectDatabase();
    const query = `
    SELECT c.*, 
    ch.nom as chauffeur_nom, 
    tr.immat as tracteur_immat, 
    bn.immat as benne_immat, 
    p.nom as produit_nom, 
    u.nom as user_nom, 
    pr.nom as prestataire_nom
  FROM chargements c
  JOIN chauffeurs ch ON c.chauffeur_id = ch.id
  JOIN tracteurs tr ON c.immatTracteur = tr.immat
  JOIN bennes bn ON c.immatBenne = bn.immat
  JOIN produits p ON c.type_produit_id = p.id
  JOIN users u ON c.operateur_id = u.id
  JOIN proprios pr ON c.prestataire_id = pr.id
  LEFT JOIN dechargements ON c.id = dechargements.chargement_id
  WHERE dechargements.chargement_id IS NULL;;
  
    `;
    const [rows] = await connection.query(query);
    connection.end();
    return rows;
  } catch (error) {
    console.log('erreur dans lors de la selection des chargements non déchargés', error)
    throw error;
  }
};


module.exports = {
  addChargement,
  getChargement,
  getChargements,
  updateChargement,
  deleteChargement,
  getUndechargedChargements
};
