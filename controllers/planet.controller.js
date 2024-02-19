const Planet = require('../models/planet.model')
const Star = require('../models/star.model')
const errorMessage = require('../utils/errorMessage')


// @ Description        All Planets
// @ Route              GET  /api/v1/planet/all
// @ Access             Private
exports.allPlanets = async (req,res)=>{
 try {
    const planets = await Planet.find()

    res.status(200).json({
        success: true,
        planets
    })
 } 
 catch (error) {  errorMessage(res, 500, error.message)  }
}

// @ Description        Add Planets
// @ Route              POST  /api/v1/planet/add
// @ Access             Private
exports.addPlanet = async (req,res)=>{
 try {
    const { name, temperatura, massa, yoldoshSoni, tartbRaqam, dayCountYear, star } = req.body

    if(!name || !temperatura || !massa || !yoldoshSoni || !tartbRaqam || !dayCountYear ){
       return errorMessage(res, 500, "Empty value send") 
    }
    
    const STAR = await Star.findOne({name: star})

    if(STAR){
        const arreyPlanetId = STAR.planets

        const planet = await  Planet.create({
            name, temperatura, massa,
            yoldoshSoni, tartbRaqam, dayCountYear,
            star: STAR._id
        })

        arreyPlanetId.push(planet._id)
        const a = await Star.findOneAndUpdate({name: star}, {planets: arreyPlanetId})
    }

    const planet = await  Planet.create({
        name, temperatura, massa,
        yoldoshSoni, tartbRaqam, dayCountYear,
    })
    
    return res.status(201).json({
        success: true,
        planet
    })
 } 
 catch (error) { return errorMessage(res, 500, error.message)  }
}

// @ Description        Update Planets
// @ Route              PUT  /api/v1/planet/:id
// @ Access             Private
exports.updatePlanet = async (req,res)=>{
 try {
    const planet = await  Planet.findById(req.params.id)
    
    const editPlanet = {
        name:          req.body.name          || planet.name,
        temperatura:   req.body.temperatura   || planet.temperatura,
        massa:         req.body.massa         || planet.massa,
        yoldoshSoni:   req.body.yoldoshSoni   || planet.yoldoshSoni,
        tartbRaqam:    req.body.tartbRaqam    || planet.tartbRaqam,
        dayCountYear:  req.body.dayCountYear  || planet.dayCountYear
    }

    const newPlanet = await Planet.findByIdAndUpdate(req.params.id, editPlanet, {  new: true })

    res.status(201).json({
        success: true,
        planet: newPlanet
    })
 } 
 catch (error) { return errorMessage(res, 500, error.message)  }
}

// @ Description        Delete Planet
// @ Route              DELETE  /api/v1/planet/:id
// @ Access             Private
exports.deletePlanet = async (req,res)=>{
 try {
    await  Planet.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: true,
        message: "Planet Deleted!"
    })
 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}


// @ Description        One Planet By Id
// @ Route              GET  /api/v1/planet/:id
// @ Access             Private
exports.onePlanetOpen = async (req,res)=>{
 try {
    const planet = await Planet.findById(req.params.id)

    res.status(200).json({
        success: true,
        planet
    })
 } 
 catch (error) {  return errorMessage(res, 500, error.message)  }
}