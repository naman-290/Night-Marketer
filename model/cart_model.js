const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = new Schema({
   
    Userid: {
        type: String
    },
    Items :[
        {
           // _id:{type:String},
            name : {type: String},
            quantity : {type : Number},
            MRP : {type : Number},
            sale_price : {type : Number}
        }
    ],
    total_amount : {
        type : Number,
        default : 0
    },
    amount_to_pay : {
        type: Number,
        default: 0
    }
})

const cart = mongoose.model('cart',cartSchema);
module.exports = cart;