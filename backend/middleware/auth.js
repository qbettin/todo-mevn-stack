const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      console.error('Error:', err);
      res.status(401).json({ message: 'Token is not valid' });
    }
};