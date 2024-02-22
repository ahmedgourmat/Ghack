const express = require('express')
const app = express()
const connectDB = require('./config/DB')
require('dotenv').config()
const cors = require('cors')
const authRouter = require('./routes/authRoutes')


const port = process.env.PORT


app.use(express.json())
app.use(cors())
app.use('/api/v1/auth' , authRouter)








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