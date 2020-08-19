//Import Error model
const HttpError = require('../GJG-Backend-Coding-Challenge/../models/http-error');

let LEADERBOARD = [
	{
		rank: 1,
		points: 5011,
		display_name: 'gjg',
		country: 'tr',
	},
];

//GET Leaderboard
const getLeaderboard = (req, res, next) => {
	res.json({ LEADERBOARD });
};
//GET Leaderboard by country iso code
const getLeaderboardByCountry = (req, res, next) => {
	const countryId = req.params.cid;
	const country = LEADERBOARD.filter(c => {
		//Filter the LEADERBOARD with the given country iso code in the GET request.
		return c.country === countryId;
	});

	//If no country is found with the given iso code, throw an Error and return.
	if (country.length === 0) {
		throw new HttpError('Could not find a country for the provided country ID.', 404);
	}
	res.json({ country }); //Respond the result
};

exports.getLeaderboard = getLeaderboard;
exports.getLeaderboardByCountry = getLeaderboardByCountry;
