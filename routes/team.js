const router = require('express').Router();
const isAuth = require('../policies/isAuth')
const controller = require('../controller/teamController');

router.get('/:userId', isAuth, controller.getTeam );

router.get('/getSentRequests/:userId', isAuth, controller.getSentRequests);

router.get('/getRecievedRequests/:userId', isAuth, controller.getRecievedRequests);


router.put('/sendRequest', controller.sendRequest); 

router.put('/acceptRequest/:userId', isAuth, controller.acceptRequest);

router.put('/cancelRequest/:userId', isAuth, controller.cancelRequest);

router.put('/declineRequest/:userId', isAuth, controller.declineRequest);


//router.put('/allRequests', controller.allRequests);

module.exports = router;        