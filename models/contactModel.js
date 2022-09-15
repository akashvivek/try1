const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: true,
    },
    lname:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  
    department: {
      type: String,
      required: true,
    },
    message:{
        type:String,
        required:true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
},
{timestamps: true})


const Contact = mongoose.model("contact", contactSchema);
module.exports =Contact;