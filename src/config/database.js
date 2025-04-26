const { MONGO_URI } = require('./../config.js');

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;