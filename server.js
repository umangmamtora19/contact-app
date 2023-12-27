const express = require("express");
const errorHandler = require("./middleware/error_handler");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db_connection");
const functions = require("firebase-functions")

connectDb();
const app = express();

const port = process.env.PORT || 1000;

app.use(express.json());
app.use("/constacts", require("./routes/contact_routes"));
app.use("/users", require("./routes/user_routes"));
app.use(errorHandler);

/*Error handling*/
// app.use((req, res, next) => {
//     const error = new Error("Not found")
//     error.status = 404
//     next(error)
// })


app.listen(port, () => {
    console.log(`Listening port is ${port}`); 
});

exports.api = functions.https.onRequest(app);