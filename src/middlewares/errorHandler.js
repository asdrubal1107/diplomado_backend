const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal. Intenta más tarde.' });
};
  
module.exports = errorHandler;