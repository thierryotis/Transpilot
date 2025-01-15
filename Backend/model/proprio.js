const  connectDatabase = require('../db/Database_online');


// Add proprio
const addProprio = async (nom, cni, phone, type) => {
    try {
      const connection = await connectDatabase();
      const query = "INSERT INTO proprios (nom, cni, phone, type) VALUES (?, ?, ?, ?)";
      const [result] = await connection.query(query, [nom, cni, phone, type]);
      connection.end(); // Close the connection after query execution
      return result.insertId;
    } catch (error) {
      throw error;
    }
  };


// Get proprio by ID
const getProprio = async (id) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM proprios WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();
    return rows[0]; // Return the first row (assuming ID is unique)
  } catch (error) {
    throw error;
  }
};
// Get all proprios
const getProprios = async () => {
    try {
      const connection = await connectDatabase();
      const query = "SELECT * FROM proprios";
      const [rows] = await connection.query(query);
      connection.end();
      return rows;
    } catch (error) {
      throw error;
    }
  };
  
  // Update proprio
  const updateProprio = async (id, nom, cni, phone) => {
    try {
      const connection = await connectDatabase();
      const query = "UPDATE proprios SET nom = ?, cni = ?, phone = ? WHERE id = ?";
      const [result] = await connection.query(query, [nom, cni, phone, id]);
      connection.end();
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  };
  
  // Delete proprio
  const deleteProprio = async (id) => {
    try {
      const connection = await connectDatabase();
      const query = "DELETE FROM proprios WHERE id = ?";
      const [result] = await connection.query(query, [id]);
      connection.end();
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    addProprio,
    getProprios,
    updateProprio,
    deleteProprio,
  };
  

