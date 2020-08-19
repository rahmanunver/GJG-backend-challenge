const express = require('express');
const { check } = require('express-validator'); //Using express-validator to validate the request.

//Import controllers
const scoreControllers = require('../GJG-Backend-Coding-Challenge/../controllers/score-controllers');

//Create route
const router = express.Router();

//GET Scores
router.get('/', scoreControllers.getScores);

//POST (Submit)  Score
router.post('/submit', check('score_worth').not().isEmpty(), scoreControllers.submitScore);

module.exports = router;
