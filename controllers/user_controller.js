const User = require("../model/user_model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cart = require("../model/cart_model");



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const tokenexpiresin = 3*60*60*60
const createToken = (unique) => {
    const token = jwt.sign({"id": unique},process.env.SECRET_KEY,{
        expiresIn: tokenexpiresin
    })

    return token;
}

var signup = async (req,res) => {
 var email = req.body.email;
 var password = req.body.password;
 var username = req.body.username;
 let max = 9999999999
 var Userid = getRandomInt(max)
 console.log(email,password,username);
 var data = new User({
     email: email,
     password : password,
     username: username,
     Userid : Userid
 })
 //console.log(data); 
 
 try{
 var response = await data.save(); 

 try{

     var cart_data = new cart({
         Userid : Userid
     })
  var cart_response = await cart_data.save();
 }
 catch(error)
 {
    res.json({
        status: false,
        response: cart_response
    })
 }
 res.json({
     status: true,
     response: response
 })
 

 //res.render("login.ejs");

 }
 catch(error)
 {
     console.log(error.message);
    res.json({
        errors: error.message
    })
 }

}


var login = async (req,res) => {

    var username = req.body.username;
    var password = req.body.password;
    console.log(password);

    try{
    var response = await User.findOne({username});
      
    if(response)
    {
        console.log(password,response.password);
      if(response.password == password)
      {
          const token = createToken(response._id);
          res.cookie('jwt',token,{tokenExpiresin : tokenexpiresin * 1000});
          res.json({
            status: true,
            response: response,
            message : "Login Success"
        })
      }else{
        res.json({
            status: false,
            response: response,
            message : "Login Failed"
        })
      }
    }else{
        res.json({
            status: false,
            response: response,
            message : "Login Failed"
        })
    }
    }
    catch(error)
    {
        res.json({
        status: false,
        response: response,
        message : "Login Failed"
    })

    }


     
    

}

const forgotPassword = (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username})
    .then((response) => {
        response['password'] = password;
        
        User.findOneAndUpdate({username},{$set: response})
        .then((response2) => {
            return res.redirect("/login");
        })
        .catch((error) => {
            return res.redirect("/forgotPassword")
    })
    })
    .catch((error) => {
        res.redirect("/forgotPassword");
    })
}

const getUser = async (req,res) => {

    var email = req.body.email;
    try{
        var response = await User.findOne({email});
        if(response)
        {
            res.json({
                status : true,
                response: response
            })
        }
        else{
            res.json({
                status : false,
                message : "User not found"
            })
        }
    }
    catch(error)
    {
        res.json({
            status : false,
            error : error
        })
    }
}
module.exports = {signup,login,forgotPassword,getUser}