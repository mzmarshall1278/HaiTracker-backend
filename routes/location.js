const router = require('express').Router();
const isAuth = require('../policies/isAuth');

const controller = require('../controller/locationController');

router.get('/all', isAuth,  controller.getAllLocations);

router.get('/:user', isAuth, controller.getOneLocation);

router.put('/:user', isAuth, controller.updateMyLocation);

module.exports = router;    