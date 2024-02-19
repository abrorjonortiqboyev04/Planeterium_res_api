const User = require('../models/user.model')
const errorMessage = require('../utils/errorMessage')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')

// @ Description        User Registration
// @ Route              POST  /api/v1/auth/registr
// @ Access             Public
exports.userRegistration = async (req, res)=>{
 try {
    const { name, password, email } = req.body

    // Empty name email or password
    if(!name || !password || !email){
      return  errorMessage(res, 500, "Empty name, password or email!") 
    }

    // Password Hashed
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Create User in Database
    const user = await User.create({
       name, email,
       password: hashPassword,
       apiKey: uuid.v4()
    })

    const token = user.jwtGenerate()
   
    return res.status(201).json({
      success: true,
      user,
      token
    })
 }
 catch (error) { return errorMessage(res, 500, error.message)  }
}


// @ Description        User Login
// @ Route              POST  /api/v1/auth/login
// @ Access             Public
exports.userLogin = async (req,res)=>{
 try {
   const { email, password } = req.body

   // Empty email or password
   if(!email || !password){
      return errorMessage(res, 500, "Empty entered email or password")
   }
   
   // Find Database Email
   const user = await User.findOne({email})
   
   if(!user){
      return errorMessage(res, 500, "Invalid entered email or password")
   }
   
   // Validation password
   const hashPassword = await bcrypt.compare(password, user.password)

   if(!hashPassword){
      return errorMessage(res, 500, "Invalid entered email or password")
   }

   const token = user.jwtGenerate()

   res.status(200).json({
      success: true,
      user,
      token
   })
 }
 catch (error) {  return errorMessage(res, 500, error.message)  }
}


// @ Description        User Profile
// @ Route              POST  /api/v1/auth/:id
// @ Access             Private
exports.userProfile = async (req,res)=>{
 try {
   const user = await User.findById(req.params.id)

   res.status(200).json({
      success: true,
      user
   })
 } 
 catch (error) {  return errorMessage(res, 500, error.message) }
}


// @ Description        User Update Email or Name
// @ Route              POST  /api/v1/auth/:id
// @ Access             Private
exports.userUpdate = async (req,res)=>{
 try {
   const user = await User.findById(req.params.id)

   
   const name  =  req.body.name   || user.name
   const email =  req.body.email  || user.email

   const  updateUser = await User.findByIdAndUpdate(req.params.id, {name, email}, {new: true})
   
   res.status(201).json({
      success: true,
      user: updateUser
   })

 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}

// @ Description        User Update Password
// @ Route              POST  /api/v1/auth/:id
// @ Access             Private
exports.updateUserPassword = async (req,res)=>{
 try {
   const { password, newPassword } = req.body
   
   const user = await User.findById(req.params.id)

   const hashPassword = await bcrypt.compare(password, user.password)

   if(!hashPassword){
      return errorMessage(res, 500, "Invalid Entered Password!") 
   }
   
   // New hash Password Generate
   const salt = await bcrypt.genSalt(10)
   const newHashPassword = await  bcrypt.hash(newPassword, salt)

   const updateUserPassword = await User.findByIdAndUpdate(req.params.id, {password: newHashPassword}, {new: true})

   res.status(201).json({
      success: true,
      user: updateUserPassword
   })
 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}