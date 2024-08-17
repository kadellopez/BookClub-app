

const Book = require('../models/book')

const index = async (req, res) => {
    try {
        const foundBooks = await Book.find({})
        res.render('books/index.ejs', { 
            books: foundBooks
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const brandNew = (req, res) => {
    res.render('books/new.ejs')
}

const create = async (req, res) => {
    try {
        const createdBook = await Book.create(req.body)
        res.redirect(`/books/${createdBook._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundBook = await Book.findById(req.params.id)
        res.render('books/show.ejs', { 
            book: foundBook
        })
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
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.redirect(`/books/${updatedBook._id}`)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const reMoof = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if (!deletedBook) {
            res.status(404).json({ msg: error.message })
        } else {
            res.redirect('/books')
        }
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
    reMoof
}
