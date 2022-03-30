const express = require('express');
const router = express.Router();

const Projects = require('../models/projects.model');

router.get('/', (req, res) => {
    Projects.find()
        .then(projects => res.json(projects))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newProject = new Projects({
        pid : req.body.pid,
        pname : req.body.pname,
        pstart : req.body.pstart,
        pdesc : req.body.pdesc,
        ppriority : req.body.ppriority,
        pContact : req.body.pContact,
        pAddress : req.body.pAddress
    });

    newProject.save()
        .then(project => res.json(project))
        .catch(error => res.status(400).json(error));
});

router.get('/:id', (req, res) => {
    Projects.findById(req.params.id)
        .then(project => res.json(project))
        .catch(error => res.status(404).json(error));
});

router.put('/:id', (req, res) => {
    Projects.findByIdAndUpdate(req.params.id, {$set : req.body}, { new : true })
        .then(project => res.json(project))
        .catch(error => res.status(400).json(error));
});

module.exports = router;