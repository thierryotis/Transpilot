const jwt = require("jsonwebtoken");
const connectDatabase = require('../db/Database_online');


const isAuthenticated = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1]; // extract token from authorization header

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_KEY); // decode token to get user _id
    //console.log(decoded);

    // Attach the decoded user data to the request object for further processing
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

const userRole = async(req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.dir("Hello");

  if(!token) {
    console.log("Hello");
    return next(new Error("Please login to continue")); // 401 status handled in global error handler
  }

  
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  var id = decoded.userId;

  try {
    const connection = await connectDatabase();
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await connection.query(query, [id]);
    connection.end();

    if (rows.length === 0) {
      console.log('user not found');
      return next(new Error('User not found')); // Handle the error appropriately
    }

    const user = rows[0];
    //console.log(user, 'user role ', user.role);

    // Attach the user role to the request object if needed later
    req.userRole = user.role;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

module.exports = {
  userRole,
  isAuthenticated
}
