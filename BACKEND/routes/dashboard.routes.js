const express = require("express");
const Team = require("../models/team.model.js");
const Player = require("../models/player.model.js");

const router = express.Router();

// GET /api/dashboard
router.get("/", async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const totalPlayers = await Player.countDocuments();
    const SoldPlayers = await Player.find({ teamAssigned: { $ne: null } });

    const teams = await Team.find();

    res.json({
      totalTeams,
      totalPlayers,
      SoldPlayers,
      teams,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
