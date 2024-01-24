const {db} = require("./config/firebase.js")
const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();

const app = express();



// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger("dev"));

app.get("/api/get/hello", (req,res) =>{
    res.send("Hello world");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});