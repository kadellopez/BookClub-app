const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const ensureAuthenticated = require('../auth/authMiddleware')
const ensureBookOwner = require('../auth/authMiddleware')

router.get('/', bookController.index)
router.get('/new', ensureAuthenticated, bookController.brandNew)
router.post('/', ensureAuthenticated, bookController.create)
router.get('/:id', ensureAuthenticated, bookController.show)
router.get('/:id/edit', ensureAuthenticated, ensureBookOwner, bookController.edit)
router.put('/:id', ensureAuthenticated, ensureBookOwner, bookController.update)
router.post('/:id', ensureAuthenticated, ensureBookOwner, bookController.reMoof)
router.get('/user/:userId', ensureAuthenticated, bookController.booksByUser)

module.exports = router
