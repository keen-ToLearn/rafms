const express = require('express');
const router = express.Router();

const Stocks = require('../models/stocks.model');

router.get('/', (req, res) => {
    Stocks.find()
        .then(stocks => res.json(stocks))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newStock = new Stocks({
        sNo : req.body.sNo,
        stockItem : req.body.stockItem,
        stockCost : req.body.stockCost,
        stockQty : req.body.stockQty,
        stockTotalCost : req.body.stockTotalCost
    });

    newStock.save()
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Stocks.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;