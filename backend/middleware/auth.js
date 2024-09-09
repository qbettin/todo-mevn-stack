const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "12ebd4da88786f83a58bb5b8c5e2269283eff477059f225d6808e6b98b8ae826f95395076808974da2d266c7374fce6d5f1047d89c611d73e2dd2ac06bcb1ca5"
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