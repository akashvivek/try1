const Appointment = require("../models/appointModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");

exports.createAppointReview = catchAsyncErrors(async (req, res, next) => {
  const {
    doctorName,
    phone,
    name,
    diagnosis,
    labTests,
    medicine,
    remarks,
    caseHistory,
  } = req.body;

  const review = {
    doctorName,
    phone,
    name,
    diagnosis,
    labTests,
    medicine,
    remarks,
    caseHistory,
  };

  const appointment = await Appointment.findOne({ phone: phone, name: name });

  if (!appointment) {
    return next(new ErrorHandler("User not Found", 404));
  }

  appointment.Prescription.push(review);

  await appointment.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
}); ///400000

exports.getAllPrescPatient = catchAsyncErrors(async (req, res, next) => {
  const { phone, name } = req.body;

  const presc = await Appointment.findOne({ phone: phone, name: name });

  if (!presc) {
    return next(new ErrorHandler("Patient Not Found ", 404));
  }

  res.status(200).json({
    success: true,
    presc: presc.Prescription,
  });
});

exports.getLastPrescPatient = catchAsyncErrors(async (req, res, next) => {
  const { phone, name } = req.body;

  if (!phone || !name) {
    return next(new ErrorHandler("Please ENter Name & Phone", 400));
  }

  const presc = await Appointment.findOne({ phone: phone, name: name });

  if (!presc) {
    return next(new ErrorHandler("Patient Not Found", 401));
  }

  let noOfAppoint = presc.Prescription.length;

  let lastPresc = presc.Prescription[noOfAppoint - 1];

  res.status(200).json({
    success:true,
    lastPresc,
   
  })
});

// exports.getLastPrescPatient = catchAsyncErrors(async (req, res, next) => {
//   const { phone, name } = req.body;

//   if (!phone || !name) {
//     return next(new ErrorHandler("Please ENter Name & Phone", 400));
//   }

//   const presc = await Appointment.findOne({ phone: phone, name: name });

//   if (!presc) {
//     return next(new ErrorHandler("Patient Not Found", 401));
//   }

//   let noOfAppoint = presc.Prescription.length;

//   let lastPresc = presc.Prescription[noOfAppoint - 1];

  
//   sendToken(lastPresc, 200, res);
// });
