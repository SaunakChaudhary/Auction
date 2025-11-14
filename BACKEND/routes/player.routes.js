const express = require("express");
const {
  upload,
  uploadPlayersFromExcel,
  playersInfo,
} = require("../controllers/upload.controller.js");
const axios = require("axios");
const Player = require("../models/player.model.js");
const Team = require("../models/team.model.js");
const router = express.Router();

router.post("/upload-excel", upload.single("file"), uploadPlayersFromExcel);

router.get("/", playersInfo);

router.get("/drive-image/:id", async (req, res) => {
  try {
    const fileId = req.params.id;
    const url = `https://drive.google.com/uc?export=view&id=${fileId}`;

    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    res.set("Content-Type", response.headers["content-type"] || "image/jpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).send("Failed to fetch image");
  }
});

router.put("/auction/:id", async (req, res) => {
  try {
    const { price, teamAssigned } = req.body;

    const updated = await Player.findByIdAndUpdate(
      req.params.id,
      { price, teamAssigned },
      { new: true }
    );

    const team = await Team.findById(teamAssigned);

    const updatedTeam = await Team.findByIdAndUpdate(
      teamAssigned,
      {
        remainingPurse: team.remainingPurse - price,
        totalPlayers: team.totalPlayers + 1,
        players: [...team.players, req.params.id],
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/player/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const players = await Player.findOne({ PlayerNo: id });

    res.json({
      data: players,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route("/sold-players").get(async (req, res) => {
  try {
    const soldPlayers = await Player.find({
      teamAssigned: { $ne: null },
    }).populate("teamAssigned");
    res.json({ data: soldPlayers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
