const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../config/.env' });

const canAdmin = (req, res, next) => {
    // Get the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1]; // extract token from authorization header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.TOKEN_KEY); // decode token to get user _id
    console.log(decoded)

    // Attach the decoded user data to the request object for further processing
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token.' });
  }
  };


  const canAddSecretaire = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'secretaire') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

 

  const canChargement = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'chargeur' || decodedToken.role === 'dechargeur') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  const canAddDechargement = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'dechargement') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient dechargement.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  
  const canListUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  
      if (decodedToken.role === 'admin') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient. List user' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  const canSecretaire = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'secretaire') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
  

  const canListCharteur = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'chargeur') {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied. User role is insufficient.' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
  

  const canDechargement = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  
      if (decodedToken.role === 'admin' || decodedToken.role === 'dechargeur') {
        next();
      } else {
        console.log(decodedToken.Role)
        return res.status(403).json({ message: 'Access denied. User role is insufficient. Can dechargement' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };

  module.exports = {
    canDechargement, canChargement,canAdmin, canSecretaire
  }