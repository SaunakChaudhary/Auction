const xlsx = require("xlsx");
const multer = require("multer");
const Player = require("../models/player.model.js");

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadPlayersFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Read Excel buffer
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    if (!jsonData.length) {
      return res.status(400).json({ message: "Excel sheet is empty" });
    }

    const playersToInsert = [];

    for (const row of jsonData) {
      const fullName = row["Full Name"];
      const email = row["Email"];
      const department = row["Department Name [Ex :- FY CA & IT ]"];
      const enrollmentNumber = row["Enrollment number"];
      const playerType = row["Type of player"];
      const PlayerNo = row["PlayerNo"];
      const tournamentPlayed =
        row["If you have played any tournament? If yes , Name it."];
      const whatsappNumber =
        row["Whatsapp number and phone number [ both require ] *"];
      const photo = row["PHOTO (JPG FORMAT REQUIRED)"];

      // Basic validation
      if (!fullName || !email || !enrollmentNumber) continue;

      playersToInsert.push({
        fullName,
        email,
        department,
        enrollmentNumber,
        playerType,
        tournamentPlayed,
        whatsappNumber,
        phoneNumber: whatsappNumber, //
        photo,
        PlayerNo
      });
    }

    const inserted = await Player.insertMany(playersToInsert, {
      ordered: false,
    });

    res.status(200).json({
      message: "Players imported successfully",
      count: inserted.length,
    });
  } catch (error) {
    console.error("Excel upload error:", error.message);
    res
      .status(500)
      .json({ message: "Error importing players", error: error.message });
  }
};

const playersInfo = async (req, res) => {
  try {
    const players = await Player.find().populate("teamAssigned");
    res.status(200).json(players);
  } catch (error) {
    console.error("Error fetching players info:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching players info", error: error.message });
  }
};

module.exports = {
  upload,
  uploadPlayersFromExcel,
  playersInfo,
};
