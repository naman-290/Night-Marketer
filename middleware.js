const jwt = require("jsonwebtoken");
const user = require("./model/user_model");
const dotenv = require("dotenv").config();

const reqAuth = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token)
    {
     jwt.verify(token,process.env.SECRET_KEY,(err,decodedToken) => {
         if(err)
         {
             console.log(err);
             res.redirect("/login");
         }else{

             next();
         }
     })
    }else{
        res.redirect("/login");

    }
}

const checkUser = async (req,res,next) => {
    const token = req.cookies.jwt;
    if(token)
    {
     jwt.verify(token,process.env.SECRET_KEY,async (err,decodedToken) => {
         if(err)
         {
             res.locals.user = null;
             console.log(err);
            next();
         }else{
             //console.log(decodedToken);
             var data = await user.findById(decodedToken.id);
             res.locals.user = data;
             next();
         }
     })
    }else{
        res.redirect("/login");

    }
}

module.exports = {
    reqAuth, checkUser
};