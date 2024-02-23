const express = require('express')
const app = express()
const connectDB = require('./config/DB')
require('dotenv').config()
require('./middlewares/passportAuth')
const cors = require('cors')
const authRouter = require('./routes/authRoutes')
const objectivesRouter = require('./routes/objectivesRoutes')
const planRouter = require('./routes/planRoutes')
const courseRouter =require('./routes/coursesRoutes')
const passport = require('passport')
const cookieSession = require('cookie-session')
const authMiddleware = require('./middlewares/jwtMiddleware')


const port = process.env.PORT

app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))


app.use(cookieSession({
    name: 'session',
    keys: ['Ahmed'],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/api/v1/objectives', objectivesRouter)
app.use('/api/v1/plan', authMiddleware, planRouter)
app.use('/api/v1/courses' , authMiddleware , courseRouter)


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
