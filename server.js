const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const mongoDbConnect = require('./config/db')

dotenv.config()
const app = express()
const PORT = process.env.PORT

mongoDbConnect()

// Body Parser 
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Authentication 
app.use('/api/v1/auth', require('./routers/auth.router'))

// Planets
app.use('/api/v1/planet', require('./routers/planet.router'))

// Stars
app.use('/api/v1/star', require('./routers/star.router'))

app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`.bgCyan)
})