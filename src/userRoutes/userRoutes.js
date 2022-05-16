const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { addUserToDb, findUserByEmail } = require('../model/userModel');
const { validateUser } = require('../middleware');
const { jwtSecret } = require('../config');

const userRoutes = express.Router();

userRoutes.post('/register', validateUser, async (req, res) => {
  console.log('req.body ===', req.body);
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
  };

  const insertResult = await addUserToDb(newUser.email, newUser.password);
  if (insertResult === false) {
    res.status(500).json({ success: false, msg: 'something is wrong' });
    return;
  }

  res.status(201).json({ success: true, msg: 'user created' });
});
userRoutes.post('/login', validateUser, async (req, res) => {
  const { email, password } = req.body;

  const [foundUser] = await findUserByEmail(email);

  if (!foundUser) {
    res.status(400).json({ success: false, msg: 'email or password not found' });
    return;
  }
  if (!bcrypt.compareSync(password, foundUser.password)) {
    res.status(400).json({ success: false, msg: 'email or password not found' });
    return;
  }
  const paylod = { userId: foundUser.id };
  const token = jwt.sign(paylod, jwtSecret, { expiresIn: '1h' });
  res.json({ success: true, msg: 'login success', token });
});

module.exports = userRoutes;
