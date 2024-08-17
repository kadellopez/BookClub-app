require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const session = require('express-session')
const methodOverride = require('method-override')
constBook = require('./models/book')
constUser = require('./models/user')
const bookRoutes = require('./routes/books')
const userRoutes = require('./routes/users')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use((req, res, next) => {
    res.locals.user = req.session.user
    next()
});
app.use('/books', bookRoutes)
app.use('/users', userRoutes)

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('its connected')
})

mongoose.connection.on('error', () => {
    console.log('connection error')
})


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
})