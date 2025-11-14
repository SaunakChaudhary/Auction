const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    PlayerNo : { type: String, required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    enrollmentNumber: { type: String, required: true },
    playerType: { type: String, required: true },
    tournamentPlayed: { type: String, default: "N/A" },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    photo: { type: String, default: null },
    price: { type: Number, default: 0 },
    teamAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
  },
  { timestamps: true }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
