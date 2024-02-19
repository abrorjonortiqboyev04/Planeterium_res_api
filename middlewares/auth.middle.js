const jwt = require('jsonwebtoken')
const errorMessage = require('../utils/errorMessage')
const User = require('../models/user.model')


// JWT Validation
exports.private = async (req,res,next)=>{
    
    let token

    if(req.headers.auth && req.headers.auth.split(' ')[0]==="Bearer"){
        token = req.headers.auth.split(' ')[1]
    } 

    if(!token){
        return errorMessage(res, 500, "Invalid JWT Token!")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    if(!decoded){
        return errorMessage(res, 500, "Invalid JWT Token!")
    }
    
    req.user = await User.findById(decoded.id)
    
    next()
}

// isAdmin Validate
exports.isAdmin = (req, res, next)=>{
 try {
    if(!req.user.isAdmin){
        return errorMessage(res, 500, "Your not Admin!!") 
    }
    next()
 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}


// Active apiKey validate
exports.isActiveApiKey = (req,res,next)=>{
 try {
    if(!req.user.active){
        return errorMessage(res, 500, "Your Apikey not Active!!")
    }
    next()
 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}