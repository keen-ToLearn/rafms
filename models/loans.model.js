const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    sNo : { type: Number },
    loanFor : { type: String },
    loanSrc : { type: String },
    loanAmt : { type: Number },
    loanPeriod : { type: Number },
    loanRate : { type: Number },
    loanDate : { type: String }
});

const Loans = mongoose.model('Loans', loanSchema);

module.exports = Loans;