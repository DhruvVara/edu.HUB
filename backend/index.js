const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")

const PORT = process.env.PORT || 5000;

const db = require("./config/database");


dotenv.config({ path: "./.env" });
app.use(express.json());
db.connect();

app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
})




app.listen(PORT, (req, res) => {
    console.log(`Server Running at ${PORT}`);
})