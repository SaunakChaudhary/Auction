const express = require("express");
const Team = require("../models/team.model");

const router = express.Router();

// 📌 Create Team
router.post("/", async (req, res) => {
  try {
    const { name, ownerName, email, password, logo, purse, captainName, iconPlayerName, CaptainPhoto, IconPlayerPhoto } = req.body;

    if (!name || !ownerName || !email || !password || !purse)
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });

    const existingTeam = await Team.findOne({ $or: [{ name }, { email }] });
    if (existingTeam)
      return res
        .status(400)
        .json({ message: "Team name or email already exists." });

    const team = new Team({
      name,
      ownerName,
      email,
      password,
      logo,
      purse,
      remainingPurse: purse,
      captainName,
      iconPlayerName,
      CaptainPhoto,
      IconPlayerPhoto,
    });

    await team.save();
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating team", error: error.message });
  }
});

// 📌 Get All Teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 }).populate('players');
    res.json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teams", error: error.message });
  }
});

// 📌 Delete Team (Optional)
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting team", error: error.message });
  }
});

module.exports = router;
