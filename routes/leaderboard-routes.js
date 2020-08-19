const express = require('express');

//Import controllers
const leaderboardControllers = require('../controllers/leaderboard-controllers');

//Create route
const router = express.Router();

//GET Leaderboard
router.get('/', leaderboardControllers.getLeaderboard);
//GET Leaderboard by country iso code
router.get('/:cid', leaderboardControllers.getLeaderboardByCountry);

module.exports = router;
