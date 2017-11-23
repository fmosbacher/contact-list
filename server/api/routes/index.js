var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users.controller.js');

router
    .route('/users')
    .get(usersCtrl.usersGetAll)
    .post(usersCtrl.usersAddOne);

router
    .route('/users/:userId')
    .get(usersCtrl.usersGetOne)
    .put(usersCtrl.usersUpdateOne)
    .delete(usersCtrl.usersDeleteOne);

module.exports = router;
