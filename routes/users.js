const express = require('express');
const router = express.Router();

const Users = require('../models/users.model');

router.get('/', (req, res) => {
    Users.find()
        .then(users => res.json(users))
        .catch(error => res.status(404).json(error))
});

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(error => res.status(404).json(error))
});

router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(() => res.json(req.body))
        .catch(error => res.status(400).json(error));
});

module.exports = router;