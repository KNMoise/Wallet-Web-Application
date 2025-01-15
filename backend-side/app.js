const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectToDatabase, sequelize } = require("./db/connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const index = require("./routes/index");
const setupAssociations = require('./models/association');


const app = express();
const PORT = process.env.PORT || 9000;

// Ensure all critical configs are validated before starting the server
process.on("uncaughtException", (error) => {
  console.error("Critical error:", error);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 30,
    },
  })
);

app.use("/api/v1/auth", index);

async function startServer() {
  try {
    // Connect to database
    await connectToDatabase();
    await setupAssociations();
    
    await sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((err) => {
        console.error("Error syncing the database:", err);
      });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Challenge: ${process.env.NODE_ENVS}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
