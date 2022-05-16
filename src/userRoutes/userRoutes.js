const express = require('express');

const bcrypt = require('bcryptjs');
const { addUserToDb } = require('../model/userModel');
const { validateUser } = require('../middleware');

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

module.exports = userRoutes;
