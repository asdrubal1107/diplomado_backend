const User = require("../models/User");
const bcryptjs = require("bcryptjs");

// Validar si el email ya existe
const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    return res.status(200).json(!!emailExists); // Devuelve true o false
  } catch (err) {
    console.error('Error al validar el email:', err);
    res.status(500).json({ message: 'Error al validar el email' });
  }
};

// Validar si el nombre de usuario ya existe
const checkUsername = async (req, res) => {

  const { userName } = req.body;

  try {
    
    const usernameExists = await User.findOne({ userName });

    return res.status(200).json(!!usernameExists);
  } catch (err) {
    console.error('Error al validar el username:', err);
    res.status(500).json({ message: 'Error al validar el username' });
  }
};

// Validar si la contraseña es correcta
const checkPassword = async (req, res) => {
  const { password, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    return res.status(200).json(!isPasswordValid); // true si está mal, false si es correcta
  } catch (err) {
    console.error('Error al validar el password:', err);
    res.status(500).json({ message: 'Error al validar el password' });
  }
};

module.exports = {
  checkEmail,
  checkUsername,
  checkPassword
};
