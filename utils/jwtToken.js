
const sendToken = (user, statuscode,res)=>{

    const token = user.getJWTToken();

   
    const options = {
        expire: new Date(
            Date.now + process.env.COOKIE_EXPIRE*24*60*100*60
        ),
        httponly:true
    }

    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendToken