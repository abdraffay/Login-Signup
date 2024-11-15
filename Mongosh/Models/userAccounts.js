const mongoose = require("mongoose");

const userAcountsModel = mongoose.Schema(
    {
        userName:{
            type:String,
            required:[true,"User Name must be filled"]
        },
        userEmail:{
            type:String,
            required:[true,"User Email must be filled"],
        },
        userPassword:{
            type:String,
            required:[true,"User Password must be there and contains at least 8 characters"]
        },
        userImage:{
            type:String,
            required:false
        },
        userRole:{
            type:String,
            required:false
        }
    }
    );

    const UserAccounts = mongoose.model("UserAccounts", userAcountsModel)
    module.exports = {UserAccounts};