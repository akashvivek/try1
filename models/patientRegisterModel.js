const mongoose = require("mongoose");

const patientregisterationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
 
  drugHistory: {
    type: String,
    required: true,
  },
  anydrugHistory: {
    type: String,
    default: "No"
  },
  allergy: {
    type: String,
    required: true,
  },
  familyHistory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{timestamps: true});

const patientRegister = mongoose.model(
  "patientRegister",
  patientregisterationSchema
);
module.exports = patientRegister;
