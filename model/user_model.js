const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username :{
        type: String
    },
    email :{
        type: String
        
    },
    password:{
        type: String
        
    },
    Userid :{
        type : String
    }
});

const User = mongoose.model('User',userSchema);
module.exports = User;