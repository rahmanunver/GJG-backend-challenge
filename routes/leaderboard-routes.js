const express = require('express');

//Import controllers
const leaderboardControllers = require('../GJG-Backend-Coding-Challenge/../controllers/leaderboard-controllers');

//Create route
const router = express.Router();

//GET Leaderboard
router.get('/', leaderboardControllers.getLeaderboard);
//GET Leaderboard by country iso code
router.get('/:cid', leaderboardControllers.getLeaderboardByCountry);

module.exports = router;
