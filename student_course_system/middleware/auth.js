const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { query } = req.body;

  // Allow unauthenticated access to registerStudent and loginStudent mutations
  if (query && (query.includes('registerStudent') || query.includes('loginStudent'))) {
    return next();
  }

  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
