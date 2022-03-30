const express = require('express');
const router = express.Router();

const Sales = require('../models/sales.model');

router.post('/', (req, res) => {
    const newProjectSale = new Sales({
        forPid : req.body.forPid,
        records : req.body.records
    });

    newProjectSale.save()
        .then(sale => res.json(sale))
        .catch(error => res.status(400).json(error));
});

router.get('/', (req, res) => {
    Sales.find()
        .then(sales => res.json(sales))
        .catch(error => res.status(404).json(error));
});

router.get('/:id', (req, res) => {
    Sales.findById(req.params.id)
        .then(sales => res.json(sales))
        .catch(error => res.status(404).json(error));
});

router.put('/:id', (req, res) => {
    Sales.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(sale => res.json(sale))
        .catch(error => res.status(400).json(error));
});

module.exports = router;