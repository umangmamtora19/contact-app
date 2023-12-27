const mongoose = require("mongoose");
const constacts  = require("../constant");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Database connnected", connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb