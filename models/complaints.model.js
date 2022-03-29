const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    sNo : { type: Number },
    cDate : { type: String },
    cDesc : { type: String },
    cStatus : { type: String }
});

const complaintSchema = mongoose.Schema({
    forPid : { type: Number },
    issues : [issueSchema]
});

const Complaints = mongoose.model('Complaints', complaintSchema);

module.exports = Complaints;