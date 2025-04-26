const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const validationRoutes = require('./routes/validations.route')

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/validations', validationRoutes)

// Middleware de manejo global de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo con éxito`);
});