const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    phone:{
      type: Number,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
  
    problemcat: {
      type: String,
      required: true,
    },
    gender:{
        type:String,
        required:true,
    },
    dhst:{
        type:String,
        required:true,
    },
    allrg:{
        type:String,
        required:true,
    },
    history:{
        type:String,
        required:true,
    },
    Prescription:[{
      phone:{
        type:Number,
        required:true,
      },
      doctorName:{
        type:String,
        required:true,
      },

      name: {
        type:String,
        required:true,
      },

      diagnosis: {
        type:String,
        required:true,
        default:"No"
      },

      labTests: {
        type:String,
        required:true,
        default:"No"
      },
      medicine: {
        type:String,
        required:true,
        default:"No"
      },
      remarks:{
        type:String,
        required:true,
        default:"No"
      },
      caseHistory: {
        type:String,
        required:true,
        default:"No"
      },
      createdAt:{
        type:Date,
        default:Date.now()
      }
      
        
      
  }],
},
{timestamps: true})


const Appointment = mongoose.model("appoint", patientSchema);
module.exports =Appointment;