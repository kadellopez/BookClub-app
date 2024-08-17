const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const ensureAuthenticated = require('../auth/authMiddleware')

router.get('/', bookController.index)
router.get('/new', ensureAuthenticated, bookController.brandNew)
router.post('/', ensureAuthenticated, bookController.create)
router.get('/:id', ensureAuthenticated, bookController.show)
router.get('/:id/edit', ensureAuthenticated, bookController.edit)
router.post('/:id', ensureAuthenticated, bookController.update)
router.post('/:id/delete', ensureAuthenticated, bookController.reMoof)

module.exports = router
