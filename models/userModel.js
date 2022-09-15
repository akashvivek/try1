const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: Number,
      required: [true, "please Enter Your Phone Number"],
      unique: true,
    },

    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
    },
    dob: {
      type: String,
      required: [true, "Please Enter Your DOB"],
    },

    gender: {
      type: String,
      required: [true, "Please Enter Your Gender"],
    },

    qualification: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type:{
      type:String,
      required:true
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  
  },
  { timestamps: true }
);


userSchema.pre("save",async function(next){

  if(!this.isModified("password")){
    next();
  }

  this.password =  await bcrypt.hash(this.password,10)
})


userSchema.methods.getJWTToken = function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
   })
}

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}



//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex")

  //Hashing and adding resetPasswordToken to userschema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

  this.resetPasswordExpire=Date.now()+15*60*1000;

  return resetToken
}



module.exports = mongoose.model("User", userSchema);



// /////////////////////////
// ////////////////////////
// /////password hashing/////
// /////////////////////////
// ////////////////////////

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//     this.cpassword = await bcrypt.hash(this.cpassword, 10);
//   }
//   next();
// });

// /////////////////////////
// ////////////////////////
// /////Token generation/////
// /////////////////////////
// ////////////////////////

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

// /////////////////////////
// ////////////////////////
// /////Message adding/////
// /////////////////////////
// ////////////////////////

// userSchema.methods.addMessage = async function (name, email, phone, message) {
//   try {
//     this.messages = this.messages.concat({ name, email, phone, message });
//     await this.messages;
//     return this.messages;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;
