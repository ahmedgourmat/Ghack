const express = require('express')
const app = express()
const connectDB = require('./config/DB')
require('dotenv').config()

const port = process.env.PORT

const start = ()=>{
    connectDB(process.env.MONGOO_URI)
    .then(()=>{
        app.listen(port , ()=>{
            console.log(`Server is listening to the port ${port}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}


start()