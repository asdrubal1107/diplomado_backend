const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
  try {

    const where = req.body.where || {}

    const query = {};

    for (let key in where) {
      if (where[key]) {
        query[key] = { $regex: new RegExp(where[key], 'i') };
      }
    }

    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {

  const user = new User(req.body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {

  try {
  
    const { id } = req.params;

    if (req.body?.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // devuelve el documento actualizado
      runValidators: true, // asegura que las validaciones del modelo se apliquen
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password, ...userData } = updatedUser._doc;

    res.json({
      user: userData                                                           
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser, updateUser, getUsers };