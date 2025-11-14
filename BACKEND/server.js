const express = require("express");
const cors = require("cors");
const DB = require("./database/DB");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const AuthRouter = require("./routes/auth.routes");
const PlayerRouter = require("./routes/player.routes");
const TeamRouter = require("./routes/team.routes");
const DashboardRouter = require("./routes/dashboard.routes");

app.use("/api/auth", AuthRouter);
app.use("/api/players", PlayerRouter);
app.use("/api/teams", TeamRouter);
app.use("/api/dashboard", DashboardRouter);


DB()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
