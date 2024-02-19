const Star = require('../models/star.model')
const errorMessage = require('../utils/errorMessage')

// @ Description        All Stars
// @ Route              GET  /api/v1/star/all
// @ Access             Private
exports.allStars = async (req,res)=>{
 try {
    const satars = await Star.find()

    res.status(200).json({
        success: true,
        satars
    })
 } 
 catch (error) {  errorMessage(res, 500, error.message)  }
}


// @ Description        Add Star
// @ Route              POST  /api/v1/star/add
// @ Access             Private
exports.addStar = async (req,res)=>{
 try {
    const { name, diametr, temperatura, massa } = req.body

    const star = await Star.create({
       name, diametr,  temperatura, massa
    })

    res.status(201).json({
        success: true,
        star
    })
 } 
 catch (error) {  errorMessage(res, 500, error.message)  }
}


// @ Description        Update Star
// @ Route              PUT  /api/v1/star/:id
// @ Access             Private
exports.updateStar = async (req,res)=>{
 try {
    const star = await Star.findById(req.params.id)

    const editStar = {
        name:         req.body.name         || star.name,
        temperatura:  req.body.temperatura  || star.temperatura,
        diametr:      req.body.diametr      || star.diametr,
        massa:        req.body.massa        || star.massa
    }

    const updatedStar = await Star.findByIdAndUpdate(req.params.id, editStar, {new: true})

    res.status(201).json({
        success: true,
        star: updatedStar
    })
 } 
 catch (error) {  errorMessage(res, 500, error.message)  }
}


// @ Description        Delete Star
// @ Route              DELETE  /api/v1/star/:id
// @ Access             Private
exports.deleteStar = async (req,res)=>{
 try {
    await Star.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        data: "Star Delete!!"
    })
 } 
 catch (error) {  errorMessage(res, 500, error.message)  }
}


// @ Description        One Star Open By Id
// @ Route              GET  /api/v1/star/:id
// @ Access             Private
exports.oneStarById = async (req,res)=>{
    try {
      const star = await Star.findById(req.params.id)
       res.status(200).json({
           success: true,
           star
       })
    } 
    catch (error) {  errorMessage(res, 500, error.message)  }
   }