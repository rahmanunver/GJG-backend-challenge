const { v4: uuid } = require('uuid'); //Using uuid package to assign uuid for newly created users
const { validationResult } = require('express-validator'); //Using express-validator to validate the request.

//Import Error model
const HttpError = require('../models/http-error');

//Users array, will be used as user storage. Initial responses may include a single user, you may delete it.
let USERS = [
	{
		user_id: 'u1',
		display_name: 'Rahman',
		points: 5011,
		rank: 1,
	},
];

//GET Users
const getUsers = (req, res, next) => {
	res.json({ USERS });
};

//GET User by user_id
const getUser = (req, res, next) => {
	const userId = req.params.uid;
	const user = USERS.find(u => {
		return u.user_id === userId;
	});

	//Throws an error and returns if the user does not exist.
	if (!user) {
		throw new HttpError('Could not find a user for the provided user ID.', 404);
	}
	res.json({ user });
};

//POST Create user with required fields, {display_name, points, rank}
const createUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError('Invalid input(s) passed, please check your data.', 422);
	}

	const { display_name, points, rank } = req.body; //Deconstruct the request

	//Create a user object with data from the request.
	const createdUser = {
		user_id: uuid(), //uuid() function creates a random uuid for the user
		display_name,
		points,
		rank,
	};

	USERS.push(createdUser); //Push the user to the USERS array

	res.status(201).json({ createdUser }); //HTTP 201 message
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.createUser = createUser;
