const User = require('../models/user')

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



module.exports = {
    registerForm,
    register,
    loginForm,
    login,
    listUsers,
    logout  
}

