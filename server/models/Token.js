const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"A token can not be formed without email"]
    },
    token:{
       type:String,
       required:[true,"A token can not be formed without token code"]
    },
    createdAt: { type: Date, expires: '30m', default: Date.now }
 
});

module.exports = mongoose.model("token",tokenSchema);
