const jwt = require('jsonwebtoken');

module.exports = function requireAdmin(req, res, next) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Authentification requise.' });

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { issuer: 'gnah-api' });
    return next();
  } catch {
    return res.status(401).json({ message: 'Session invalide ou expirée.' });
  }
};
