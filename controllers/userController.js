const User = require('../models/user')
const Book = require('../models/book')

const registerForm = (req, res) => {
    res.render('users/register')
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        await User.create({ name, email, password })
        res.redirect('/users/login')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const loginForm = (req, res) => {
    res.render('users/login')
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        if (user) {
            req.session.user = user
            res.redirect('/books')
        } else {
            res.redirect('/users/login')
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const listUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.render('users/userList.ejs', { users })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

const showUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('users/show.ejs', { user })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const showUserBooks = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        const books = await Book.find({ user: user._id })
        res.render('users/userBooks.ejs', { user, books })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    registerForm,
    register,
    loginForm,
    login,
    listUsers,
    logout,
    showUser,
    showUserBooks
}