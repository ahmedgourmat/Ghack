const router = require('express').Router()
const {createObj , getObj , getOneObj , updateObj , deleteObj} = require('../controllers/objectivesControllers')


router.route('/').post(createObj).get(getObj)
router.route('/:id').get(getOneObj).patch(updateObj).delete(deleteObj)

module.exports = router