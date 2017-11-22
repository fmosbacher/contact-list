var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersGetAll = function(getReq, getRes) {
    console.log('GET on /users');
    User
        .find()
        .exec(function(err, users) {
            if (err) {
                getRes
                    .status(404)
                    .json(err);
            } else {
                console.log('Found ' + users.length + ' users');
                getRes.json(users);
            }
        });
};

module.exports.usersAddOne = function(postReq, postRes) {
    var userId = getReq.body.userId;

    User
        .findById(userId)
        .exec(function(err, user) {
            if (err) {
                postRes
                    .status(404)
                    .json(err);
            } else {
                console.log('Found user', user);
                postRes.json(user);
            }
        })
};
