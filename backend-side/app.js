const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectToDatabase, sequelize } = require("./db/connection");
const index = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await connectToDatabase();

    await sequelize
      .sync({ force: false })
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((err) => {
        console.error("Error syncing the database:", err);
      });
    app.use(express.json());
    app.use(cors());
    
    app.use("/api/v1", index);
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
