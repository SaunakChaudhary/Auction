const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, "Team owner name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Owner email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    logo: {
      type: String, // URL or file path to logo
      default: null,
    },
    purse: {
      type: Number,
      required: [true, "Initial purse is required"],
      min: [10000000, "Purse cannot be negative"],
    },
    remainingPurse: {
      type: Number,
      required: true,
      min: [10000000, "Remaining purse cannot be negative"],
    },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    totalPlayers: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    captainName: {
      type: String,
      required: [true, "Captain name is required"],
      trim: true,
    },
    iconPlayerName: {
      type: String,
      required: [true, "Icon player name is required"],
      trim: true,
    },
    CaptainPhoto: {
      type: String,
      default: null,
    },
    IconPlayerPhoto: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

teamSchema.pre("save", function (next) {
  this.totalPlayers = this.players.length;
  next();
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
