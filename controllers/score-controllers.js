const { v4: uuid } = require('uuid'); //Using uuid package to assign uuid for newly created users
const { validationResult } = require('express-validator'); //Using validationResult to validate the request.

//Import Error model
const HttpError = require('../models/http-error');

//Scores object array
let SCORES = [
	{
		score_worth: 125.6,
		user_id: 'u1',
		timestamp: Date.now(), //Return a UNIX timestamp
	},
];

//GET Scores
const getScores = (req, res, next) => {
	//Sort scores with bubble sort, and reverse it so that the object with score_worth is at index 0.
	const sortedScores = SCORES.sort(function (a, b) {
		return a.score_worth - b.score_worth;
	}).reverse();

	res.json({ sortedScores });
};

//POST Submit score
const submitScore = (req, res, next) => {
	const errors = validationResult(req); //Extracts validation errors from request, and makes them an array of Errors.
	if (!errors.isEmpty()) {
		//If the array of Errors is empty, we can proceed as needed, if not, we throw an Error, and return from the function.
		console.log(errors);
		throw new HttpError('Invalid input(s) passed, please check your data.', 422);
	}

	//Object deconstruction for request body
	const { score_worth } = req.body;

	//Creates a score object with a new uuid and UNIX timestamp
	const submittedScore = {
		score_worth,
		user_id: uuid(),
		timestamp: Date.now(),
	};

	//Push new score object in to the SCORES array
	SCORES.push(submittedScore);

	res.status(201).json({ submittedScore }); //HTTP 201 message
};

exports.getScores = getScores;
exports.submitScore = submitScore;
