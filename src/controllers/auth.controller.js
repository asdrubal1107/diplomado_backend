const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

  try {
    
    const { name, email, userName, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado' });

    existingUser = await User.findOne({ userName });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, userName, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ 
      message: 'Usuario registrado con éxito',
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
