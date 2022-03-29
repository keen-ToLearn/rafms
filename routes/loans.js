const express = require('express');
const router = express.Router();

const Loans = require('../models/loans.model');

router.get('/', (req, res) => {
    Loans.find()
        .then(loans => res.json(loans))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newLoan = new Loans({
        sNo : req.body.sNo,
        loanFor : req.body.loanFor,
        loanSrc : req.body.loanSrc,
        loanAmt : req.body.loanAmt,
        loanPeriod : req.body.loanPeriod,
        loanRate : req.body.loanRate,
        loanDate : req.body.loanDate
    });

    newLoan.save()
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

router.put('/:id', (req, res) => {
    Loans.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;