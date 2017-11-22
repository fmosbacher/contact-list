var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users.controller.js');

router
    .route('/users')
    .get(usersCtrl.usersGetAll)
    .post(usersCtrl.usersAddOne);

module.exports = router;
