const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || typeof password !== 'string' || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    const validEmail = email.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();
    const validPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!validEmail || !validPassword) return res.status(401).json({ message: 'Identifiants incorrects.' });

    const token = jwt.sign({ sub: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, {
      issuer: 'gnah-api',
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });
    return res.json({ token, tokenType: 'Bearer', expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
