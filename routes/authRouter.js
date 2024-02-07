const Router = require('express');
const router = new Router();
const authController = require('../controller/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',[
    check('u_login', "Your LOGIN must be non-empty").notEmpty(),
    check('u_name', "Your NAME must be non-empty").notEmpty(),
    //check('u_name', "Your name contains an empty character").trim().contains(' '),
    check('u_surname', "Your SURNAME must be non-empty").notEmpty(),
    check('u_login', "Your LOGIN must be more than 5 characters long").isLength( {min: 5} ),
    check('u_password', "Your PASSWORD must be more than 5 characters long").isLength( {min: 4, max: 12} )
],authController.registration);
router.post('/login',authController.login);
router.get('/users', authMiddleware, authController.getUsers);
router.post('/logout',authController.logout);
router.get('/refresh', authController.refresh);

module.exports = router;