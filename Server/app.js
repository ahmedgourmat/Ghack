const express = require('express')
const app = express()
const connectDB = require('./config/DB')
require('dotenv').config()
require('./middlewares/passportAuth')
const cors = require('cors')
const authRouter = require('./routes/authRoutes')
const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session')

const port = process.env.PORT

app.use(express.json())
app.use(cors(
    {
        origin : 'http://localhost:5173',
        credentials : true
    }
))


app.use(session({
    secret: 'qsdqsdat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)

const start = () => {
    connectDB(process.env.MONGOO_URI)
        .then(() => {
            app.listen(port, () => {
                console.log(`Server is listening to the port ${port}`)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

start()
