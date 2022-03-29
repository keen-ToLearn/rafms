const express = require('express');
const router = express.Router();

const Complaints = require('../models/complaints.model');

router.post('/', (req, res) => {
    const newProjectComplaint = new Complaints({
        forPid : req.body.forPid,
        issues : req.body.issues
    });
    
    newProjectComplaint.save()
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

router.get('/', (req, res) => {
    Complaints.find()
        .then(complaints => res.json(complaints))
        .catch(error => res.status(404).json(error));
});

router.get('/:id', (req, res) => {
    Complaints.findById(req.params.id)
        .then(complaint => res.json(complaint))
        .catch(error => res.status(404).json(error));
});

router.put('/:id', (req, res) => {
    Complaints.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;