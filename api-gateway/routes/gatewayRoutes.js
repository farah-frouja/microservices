const express = require('express');
const router = express.Router();
const controller = require('../controllers/gatewayController');

router.get('/students/:id', controller.getStudentById);
router.get('/courses/:id', controller.getCourseById);

module.exports = router;
