const mongoos = require('mongoose')

const mongoDbConnect = async ()=>{
    const connectDb = await mongoos.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connect on port: ${ connectDb.connection.host }`.green)
}

module.exports = mongoDbConnect