const {constacts} = require("../constant");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(`staus code : ${statusCode}`)
    switch (statusCode) {
        case 400: //constacts.VALIDATION_ERROR:
            res.json({title: "All fields are mendetory",  message: err.message, stackTrace: err.stackTrace});
            break;

        case 401: //constacts.UNAUTHORIZED:
            res.json({title: "User is not authorised to perform this",  message: err.message, stackTrace: err.stackTrace});
            break;

        case 403: //constacts.FORBIDDEN:
            res.json({title: "FORBIDDEN",  message: err.message, stackTrace: err.stackTrace});
            break;

        case 404: //constacts.NOT_FOUND:
            res.json({title: "Data not found",  message: err.message, stackTrace: err.stackTrace});
            break;

        case 500: //constacts.SERVER_ERROR:
            res.json({title: "Server disconnected",  message: err.message,stackTrace: err.stackTrace});
            break;    
    
        default:
            console.log("All good, No error")
            break;
    }
};

module.exports = errorHandler;