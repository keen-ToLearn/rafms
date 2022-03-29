const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
    sNo : { type: Number },
    saleOf : { type: String },
    saleDate : { type: String },
    saleQty : { type: Number },
    saleAmt : { type: Number }
});

const saleSchema = mongoose.Schema({
    forPid : { type: Number },
    records : [recordSchema]
});

const Sales = mongoose.model('Sales', saleSchema);

module.exports = Sales;