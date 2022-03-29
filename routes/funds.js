const express = require('express');
const router = express.Router();

const Funds = require('../models/funds.model');

router.get('/', (req, res) => {
    Funds.find()
        .then(funds => res.json(funds))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newFund = new Funds({
        sNo : req.body.sNo,
        fundFrom : req.body.fundFrom,
        fundAmt : req.body.fundAmt,
        fundDate : req.body.fundDate
    });

    newFund.save()
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Funds.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;