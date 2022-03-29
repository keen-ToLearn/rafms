const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid : { type: String },
    uuname : { type: String },
    uopenproject : [Number],
    utodo : [String],
    uloggedIn : { type: Boolean }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;