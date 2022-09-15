const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Registering a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, phone, address, dob, gender, qualification, occupation, password , type} = req.body;

  const user = await User.create({
    name,
    email,
    phone,
    address,
    dob,
    gender,
    qualification,
    occupation,
    password,
    avatar: {
      // public_id: myCloud.public_id,
      public_id: "sample url",
      // url: myCloud.secure_url,
      url: "myCloud.secure_url",
    },
    type
  });

   
  sendToken(user, 201, res);
});


//login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please ENter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  
  sendToken(user, 200, res);
});


//get user details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{


  const user =  await User.findById(req.user.id)


  res.status(200).json({
    success:true,
    user,
  })
})




//logout error
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});



