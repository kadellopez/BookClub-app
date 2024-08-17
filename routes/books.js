const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.get('/', bookController.index)
router.get('/new', bookController.brandNew)
router.post('/', bookController.create)
router.get('/:id', bookController.show)
router.get('/:id/edit', bookController.edit)
router.post('/:id', bookController.update)
router.post('/:id/delete', bookController.reMoof)

module.exports = router
