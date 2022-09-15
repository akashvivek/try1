const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const Contact = require("../models/contactModel");



//create new contact
exports.newContact = catchAsyncErrors(async (req, res, next) => {
    const {
      fname,
      lname,
      email,
      department,
      message
    } = req.body;
  
    const contact = await Contact.create({
      fname,
      lname,
      email,
      department,
      message,
    });
  
    res.status(201).json({
      success: true,
      contact,
    });
  });