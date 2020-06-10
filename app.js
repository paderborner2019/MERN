const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const Port =config.get("port") || 5000
start() 

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"),{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(Port,() => {console.log(`starting server on Port ${Port}`)})
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

