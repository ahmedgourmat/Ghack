const router = require('express').Router()
const { getCoursesByCategory , createCourse , getCourseById , getCourses , deleteCourse } = require('../controllers/coursesConrollers')



router.route('/').post(createCourse).get(getCourses)
router.route('/:category').get(getCoursesByCategory)
router.route('/:id').get(getCourseById).delete(deleteCourse)

module.exports = router