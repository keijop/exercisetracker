const express = require('express')
const router = express.Router();
const createUser = require('../controllers/createUser.js')
const getUsers = require('../controllers/getUsers.js')
const logExercise = require('../controllers/logExercise.js')
const getExerciseLog = require('../controllers/getExerciseLog.js')

router.route('/').get(getUsers).post(createUser)
router.route('/:_id/logs').get(getExerciseLog)
router.route('/:_id/exercises').post(logExercise)

module.exports = router
