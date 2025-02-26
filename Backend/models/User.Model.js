const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: 'string',
    },
    password: {
        type: 'string',
    },
    role:{
        type: 'string',
    }
});

module.exports = mongoose.model('Registeruser', UserSchema);