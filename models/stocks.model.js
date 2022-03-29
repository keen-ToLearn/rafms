const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    sNo : { type: Number },
    stockItem : { type: String },
    stockCost : { type: Number },
    stockQty : { type: Number },
    stockTotalCost : { type: Number }
});

const Stocks = mongoose.model('Stocks', stockSchema);

module.exports = Stocks;