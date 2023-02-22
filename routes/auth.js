/*
rutas de usuarios /auth
host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearUsuario,
    loginUsuario,
    revalidarToken } = require('../controllers/auth');


router.post(
    '/',
    [
    check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de seis caracteres').isLength({ min: 6 }),
    validarCampos
    ],
    loginUsuario)

router.post(
    '/new',
    [//middlewares
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe de ser de seis caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario)

router.get('/renew',validarJWT, revalidarToken)

module.exports = router;
