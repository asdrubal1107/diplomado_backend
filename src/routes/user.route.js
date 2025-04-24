const express = require('express');
const router = express.Router();
const {createUser, getUsers, updateUser} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { userValidationRules, validate } = require('../middlewares/userValidator');

router.post('/getUsers', authMiddleware, getUsers);
router.post('/', userValidationRules, validate, createUser);
router.put('/:id', updateUser);

module.exports = router;