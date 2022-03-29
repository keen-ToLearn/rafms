const express = require('express');
const router = express.Router();

const Bills = require('../models/bills.model');

router.get('/', (req, res) => {
    Bills.find()
        .then(bills => res.json(bills))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newBill = new Bills({
        sNo : req.body.sNo,
        billName : req.body.billName,
        billTo : req.body.billTo,
        billDate : req.body.billDate,
        billTotal : req.body.billTotal,
        billClient : req.body.billClient,
        billRecords : req.body.billRecords
    });

    newBill.save()
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Bills.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;