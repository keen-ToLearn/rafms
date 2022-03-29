const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    resd : { type: String },
    locality : { type: String },
    vilcity : { type: String },
    pincode : { type: String }
});

const leaveSchema = mongoose.Schema({
    leaveDate : { type: String },
    leaveFor : { type: String }
});

const employeeSchema = mongoose.Schema({
    sNo : { type: Number },
    empName : { type: String },
    empAge : { type: Number },
    empDept : { type: String },
    empRole : { type: String },
    empMobNo : { type: Number },
    empAddress : addressSchema,
    empDailyHours : { type: Number },
    empPayType : { type: String },
    empPay : { type: Number },
    empAttendance : [String],
    empLeave : [leaveSchema]
});

const Employees = mongoose.model('Employees', employeeSchema);

module.exports = Employees;