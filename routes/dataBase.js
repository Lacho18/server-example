const express = require('express');
const router = express.Router();
const path = require('path');
const employeeControler = require('../controllers/employeesControler');
const verification = require('../middleware/verifyJWT');

router.route('/')
    .get(verification, employeeControler.getAllEmployees)
    .post(employeeControler.createNewEmploy)
    .put(employeeControler.updateEmployee)
    .delete(employeeControler.deleteEmployee);

router.route('/:id')
    .get(employeeControler.getEmployee);

module.exports = router;

    