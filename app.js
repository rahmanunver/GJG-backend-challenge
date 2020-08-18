const express = require('express');
const bodyParser = require('body-parser'); //Middleware

//Import Routes
const leaderboardRouter = require('./routes/leaderboard-routes');
const scoreRouter = require('./routes/score-routes');
const userRouter = require('./routes/user-routes');

//Import error model
const HttpError = require('./models/http-error');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

//Routes
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/score', scoreRouter);
app.use('/api/user', userRouter);

app.use((req, res, next) => {
	throw new HttpError('Could not find this route.', 404);
});

//Error handling for express
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

//Start listening our port at http://localhost:5000
const server = app.listen(PORT);

module.exports = server;
