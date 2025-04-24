const {Router} = require('express');
const { checkCedula, checkEmail, checkUsername, checkPassword } = require('../controllers/validations');

const router = Router();

router.post('/checkEmail', checkEmail);
router.post('/checkUsername', checkUsername);
router.post('/checkPassword', checkPassword)

module.exports = router;