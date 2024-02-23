const Courses = require('../models/coursesModel');

const createCourse = async (req, res) => {
    try {
        const { title, description, link, category } = req.body;
        if (!title || !description || !link || !category) {
            throw new Error('All fields are required');
        }

        const course = await Courses.create({ title, description, link, category });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Courses.findById(id);
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCourse = async (req, res) => {

    const { id } = req.params;

    try {
        await Courses.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getCoursesByCategory = async (req, res) => {

    const category = req.params

    try {
        const courses = await Courses.find({category});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCourse, getCourses, getCourseById, deleteCourse, getCoursesByCategory };
