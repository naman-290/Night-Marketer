const cart = require("../model/cart_model");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config();


const add = async (req,res) => {
    
    var Userid = req.body.Userid;
    item = {
        name : req.body.Items.name,
        quantity : req.body.Items.quantity,
        MRP : req.body.Items.MRP,
        sale_price : req.body.Items.sale_price
    }

    try{
 var response = await cart.findOneAndUpdate({Userid},{$push:{Items : item}});
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

const getCart = async (req,res) => {
    var Userid = req.body.Userid;

    try{
        var response = await cart.findOne({Userid});
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
   
const emptyCart = async (req,res) => {
    var Userid = req.body.Userid;

    try{
    var response = await cart.findOneAndUpdate({Userid},{$set:{Items : []}});
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

const removeFromCart = async (req,res) => {
    var Userid = req.body.Userid;
    try{
    var response = await cart.findOne({Userid});
    }
    catch(error)
    {
        
        res.json({
            status : false,
            message : "User not found"
        })
    }
    var _id = req.body._id;

    var items = response.Items;
    for(let i = 0;i<items.length;i++)
     {
         var temp = items[i];
         var val = temp["_id"] + ''
         if(val == _id)
         items.splice(i,1)
     }
    
     try{
     var response = await cart.findOneAndUpdate({Userid},{$set:{Items : items}});
     res.json({
         status : true,
         response: response
     })
     }
     catch(error)
     {
        res.json({
            status : false,
            message : "User not found"
        })
     }
}



module.exports = {add,getCart,emptyCart,removeFromCart}