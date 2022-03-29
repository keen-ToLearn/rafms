const express = require('express');
const router = express.Router();

const Login = require('../models/login.model');

router.get('/', (req, res) => {
    Login.find()
        .then(login => res.json(login))
        .catch(error => res.status(404).json(error))
});

module.exports = router;