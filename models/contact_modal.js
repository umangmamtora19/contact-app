const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String, 
        require: [true, "Please enter name"],
    },
    email: {
        type: String, 
        require: [true, "Please enter contact email"],
    },
    phone: {
        type: String, 
        require: [true, "Please enter contact phone"],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);