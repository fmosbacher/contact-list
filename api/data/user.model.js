var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: String,
    email: String,
    phone: String
});

mongoose.model('User', userSchema);
