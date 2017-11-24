var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.usersGetAll = function(getReq, getRes) {
    User
        .find()
        .exec(function(err, users) {
            if (err) {
                getRes
                    .status(404)
                    .json(err);
                return;
            }
            console.log('Found ' + users.length + ' users');
            getRes.json(users);
        });
};

module.exports.usersAddOne = function(postReq, postRes) {
	User
        .create({
            username: postReq.body.username,
            password: postReq.body.password,
            name: postReq.body.name,
            address: postReq.body.address,
            photo: postReq.body.photo,
            email: postReq.body.email,
            phone: postReq.body.phone
        }, function(err, user) {
            if (err) {
                console.log('Error creating user');
                postRes
                    .status(400)
                    .json(err);
                return;
            }
            postRes
                .status(201)
                .json(user);
            console.log('User added', user);
        });
};

module.exports.usersGetOne = function(getReq, getRes) {
    var userId = getReq.params.userId;
    
    User
        .findById(userId)
        .exec(function(err, user) {
            if (err) {
                postRes
                    .status(404)
                    .json(err);
                return;
            } else if (user == null) {
                console.log('User ID not found on database', userId);
                getRes
                    .status(404)
                    .json({
                        "message": "User ID not found " + userId
                    });
                return;
            }
            console.log('Found user', user);
            getRes.json(user);
        });
};

module.exports.usersUpdateOne = function(putReq, putRes) {
    var userId = putReq.params.userId;
    
    User
        .findById(userId)
        .select('-username')
        .exec(function(err, user) {
            if (err) {
                console.log('Error updating user');
                putRes
                    .status(500)
                    .json(err);
                return;
            } else if (user == null){
                console.log('User ID not found on database:', userId);
                putRes
                    .status(404)
                    .json({
                        "message": "User ID not found " + userId
                    });
                return;
            }
            user.password = putReq.body.password;
            user.name = putReq.body.name;
            user.address = putReq.body.address;
            user.photo = putReq.body.photo;
            user.email = putReq.body.email;
            user.phone = putReq.body.phone;

            user
                .save(function(err) {
                    if(err) {
                        putRes
                            .status(500)
                            .json(err);
                    } else {
                        putRes
                            .status(204)
                            .json({});
                        console.log('User updated');
                    }
                });
        })
};

module.exports.usersDeleteOne = function(delReq, delRes) {
    var userId = delReq.params.userId;
    
      User
        .findByIdAndRemove(userId)
        .exec(function(err, location) {
            if (err) {
                delRes
                    .status(404)
                    .json(err);
            } else {
                console.log("User deleted, id:", userId);
                delRes
                    .status(204)
                    .json({});        
            }
        });
};