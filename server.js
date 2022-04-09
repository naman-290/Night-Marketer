// Require
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const user_router = require("./router/user_router");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const middleware = require("./middleware");
const cart_router = require("./router/cart_router");

//Database
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const db = mongoose.connection;

db.once('open',() => {
    console.log("Database connection is success");
})

db.on('error',(error) => {
    console.log(error)
})


//app.use()
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use("/",user_router);
app.use("/cart",cart_router);
app.use(cookieParser());

//GET
app.get("/register",(req,res) => {
    res.render("signup.ejs");
})

app.get("/login",(req,res) => {
    res.render("login.ejs");
})

app.get("/home",middleware.checkUser,(req,res) => {
    res.render("home.ejs");
})

app.get("/forgotPassword",(req,res) => {
    res.render("forgotPassword.ejs");
})
//universal get 
app.get("*",(req,res) => {
   res.redirect("/login")
})



//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running ${PORT}`);
})