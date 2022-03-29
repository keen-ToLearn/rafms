const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    uname : { type: String },
    pass : { type: String }
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;