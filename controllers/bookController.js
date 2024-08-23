

const Book = require('../models/book')

const index = async (req, res) => {
    try {
        const foundBooks = await Book.find({ user: req.session.user._id })
        res.render('books/index.ejs', { books: foundBooks })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const brandNew = (req, res) => {
    res.render('books/new.ejs')
}

const create = async (req, res) => {
    try {
        const createdBook = await Book.create({
            ...req.body,
            user: req.session.user._id 
        })
        res.redirect(`/books/${createdBook._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundBook = await Book.findById(req.params.id).populate('user')
        if (!foundBook || foundBook.user._id.toString() !== req.session.user._id.toString()) {
            return res.status(404).send('Book not found or you do not have permission to view this book')
        }
        res.render('books/show.ejs', { book: foundBook })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const edit = async (req, res) => {
    try {
        const foundBook = await Book.findById(req.params.id)
        res.render('books/edit.ejs', { 
            book: foundBook
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const update = async (req, res) => {
    try {
        const foundBook = await Book.findOne({ _id: req.params.id, user: req.session.user._id })
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.redirect(`/books/${updatedBook._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const reMoof = async (req, res) => {
    try {
        const foundBook = await Book.findOne({ _id: req.params.id, user: req.session.user._id })
        if (!foundBook) {
            return res.status(404).send('Book not found or you do not have permission to delete this book')
        }
        await Book.findByIdAndDelete(req.params.id)
        res.redirect('/books')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const booksByUser = async (req, res) => {
    try {
        const { userId } = req.params
        const foundBooks = await Book.find({ user: userId })
        res.render('books/userBooks.ejs', { books: foundBooks })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    index,
    brandNew,
    create,
    show,
    edit,
    update,
    reMoof,
    booksByUser
}
