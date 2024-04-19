const express = require("express");
const { dbConnect } = require("./config/db");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

dbConnect();

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});