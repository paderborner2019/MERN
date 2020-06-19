const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const path = require('path')

const app = express()

app.use(express.json({extend:true}))
app.use('/t',require('./routes/redirect.toutes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require("./routes/links.routes"))

if (process.env.NODE_ENV ==='production') {
    app.use('/',express.static(path.join(__dirname,'client', 'build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
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

