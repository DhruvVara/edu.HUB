const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;

const db = require("./config/database");

// Routes
const userRoutes = require("./routes/User.route");
const profileRoutes = require("./routes/Profile.route")


app.use(express.json());
db.connect();

app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
})

app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);


app.listen(PORT, (req, res) => {
    console.log(`Server Running at ${PORT}`);
})