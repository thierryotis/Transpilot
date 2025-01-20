const connectDatabase = require('../db/Database_online');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Add user
const addUser = async (nom, telephone,email, password, role) => {
  try {
    const connection = await connectDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (nom, telephone,email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await connection.query(query, [nom, telephone,email, hashedPassword, role]);
    connection.end();
    return result.insertId;
  } catch (error) {
    throw error;
  }
};


// Get users
const getUsers = async () => {
  try {
  const connection = await connectDatabase();
  const query = "SELECT * FROM users";
  const [rows] = await connection.query(query);
  connection.end();
  return rows;
  } catch (error) {
  throw error;
  }
};
// User login
const login = async (telephone, password) => {
  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM users WHERE telephone = ? OR email = ?";
    const [rows] = await connection.query(query, [telephone, telephone]);
    connection.end();

    if (rows.length === 0) {
      return { state: false, msg: "Utilisateur non trouvé" };
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { state: false, msg: "Mot de passe incorrect" };
    }

    return { state: true, user }; // Renvoie l'utilisateur si tout est OK
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (userId) => {
  try {
  const connection = await connectDatabase();
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await connection.query(query, [userId]);
  connection.end();
  return result.affectedRows > 0;
  } catch (error) {
  throw error;
  }
};

// User logout
const logout = () => {
  // Perform any logout-related operations
  // For example, invalidating the token or removing it from the client-side
};

// Update user password
const updatePassword = async (id, newPassword) => {
  try {
    console.log('id :', id, ' newPassword ', newPassword)
    const connection = await connectDatabase();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = "UPDATE users SET password = ? WHERE id = ?";
    const [result] = await connection.query(query, [hashedPassword, id]);
    connection.end();
    return result.affectedRows > 0;
  } catch (error) {
    throw error; // Propagate the error to the calling function
  }
};

module.exports = {
  addUser,
  getUsers,
  login,
  deleteUser,
  logout,
  updatePassword,
};
