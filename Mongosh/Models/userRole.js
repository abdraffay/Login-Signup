const mongoose = require('mongoose');


const UserRole_Model = new mongoose.Schema({
    RoleName: {
        type: String,
        required: [true, "User Role missing"]
    },

    Status: {
        type: String,
        required: [true, "User Status missing"]
    }
});

const UserRole = mongoose.model("UserRole", UserRole_Model);

module.exports = {UserRole}