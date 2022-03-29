const mongoose = require("mongoose");

const fundSchema = mongoose.Schema({
    sNo : { type: Number },
    fundFrom : { type: String },
    fundAmt : { type: Number },
    fundDate : { type: String }
});

const Funds = mongoose.model('Funds', fundSchema);

module.exports = Funds;