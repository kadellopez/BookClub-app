const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next() 
    } else {
        res.redirect('/users/login')
    }
}

const ensureBookOwner = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        if (book && book.user.toString() === req.session.user._id.toString()) {
            return next()
        } else {
            res.status(403).json({ msg: 'You are not authorized to perform this action' })
        }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = ensureAuthenticated, ensureBookOwner 
