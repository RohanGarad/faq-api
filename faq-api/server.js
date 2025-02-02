require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");

const faqRoutes = require("./routes/faqRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", faqRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
