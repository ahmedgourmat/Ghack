const router = require('express').Router()
const {createPlan , getPlans , getOnePlan , updatePlan , deletePlan} = require('../controllers/planControllers')


router.route('/').post(createPlan).get(getPlans)
router.route('/:id').patch(updatePlan).get(getOnePlan).delete(deletePlan)


module.exports = router