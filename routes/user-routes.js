const express = require('express');
const { check } = require('express-validator'); //Using express-validator to validate the request.

//Import controller
const userControllers = require('../GJG-Backend-Coding-Challenge/../controllers/user-controllers');

//Create route
const router = express.Router();

//GET Users
router.get('/', userControllers.getUsers);

//GET user by user_id
router.get('/profile/:uid', userControllers.getUser);

//POST new user
router.post(
	'/create',
	//The second parameter is an array for validation of request fields.
	[check('display_name').not().isEmpty(), check('points').not().isEmpty(), check('rank').not().isEmpty()], //display_name, points, and rank fields shouldn't be empty.
	userControllers.createUser
);

module.exports = router;
