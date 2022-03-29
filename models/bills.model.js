const mongoose = require('mongoose');

const billrecordSchema = mongoose.Schema({
    itemQty : { type: Number },
    itemDesc : { type: String },
    itemUnitCost : { type: Number },
    itemTotal : { type: Number }
});

const billSchema = mongoose.Schema({
    sNo : { type: Number },
    billName : { type: String },
    billTo : { type: String },
    billDate : { type: String },
    billTotal : { type: Number },
    billClient : { type: String },
    billRecords : [billrecordSchema]
});

const Bills = mongoose.model('Bills', billSchema);

module.exports = Bills;