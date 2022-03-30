const express = require('express');
const router = express.Router();

const Employees = require('../models/employees.model');

router.get('/', (req, res) => {
    Employees.find()
        .then(employees => res.json(employees))
        .catch(error => res.status(404).json(error));
});

router.post('/', (req, res) => {
    const newEmployee = new Employees({
        sNo : req.body.sNo,
        empName : req.body.empName,
        empAge : req.body.empAge,
        empDept : req.body.empDept,
        empRole : req.body.empRole,
        empMobNo : req.body.empMobNo,
        empAddress : req.body.empAddress,
        empDailyHours : req.body.empDailyHours,
        empPayType : req.body.empPayType,
        empPay : req.body.empPay,
        empAttendance : req.body.empAttendance,
        empLeave : req.body.empLeave
    });

    newEmployee.save()
        .then(employee => res.json(employee))
        .catch(error => res.status(400).json(error));
});

router.get('/:id', (req, res) => {
    Employees.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(error => res.status(404).json(error));
});

router.put('/:id', (req, res) => {
    Employees.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true})
        .then(employee => res.json(employee))
        .catch(error => res.status(400).json(error));
});

module.exports = router;