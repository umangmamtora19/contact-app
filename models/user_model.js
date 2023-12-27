const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        require: [true, "Please enter name"],
    },
    email: {
        type: String, 
        require: [true, "Please enter contact email"],
        unique: [true, "Email already taken"],
    },
    phone: {
        type: String, 
        require: [true, "Please enter contact phone"],
    },
    password: {
        type: String, 
        require: [true, "Please enter contact phone"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);