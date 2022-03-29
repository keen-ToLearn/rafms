const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    area : { type: String },
    locality : { type: String },
    vilcity : { type: String },
    pinCode : { type: String }
});

const projectSchema = mongoose.Schema({
    pid : { type: Number },
    pname : { type: String },
    pstart : { type: String },
    pdesc : { type: String },
    ppriority : { type: String },
    pContact : { type: Number },
    pAddress : addressSchema
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;