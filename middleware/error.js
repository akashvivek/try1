const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongoid error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //mongoose duplicate error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //jsonwebtokenerror error
  if (err.name === "jsonWebTokenError") {
    const message = `Json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expire Errror
  if (err.name === "jsonExpireError") {
    const message = `Json web token is Expired try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(500).json({
    success: false,
    error: err.stack, 
    error: err,
    
    message: `${err.message}` ,
  });
};
