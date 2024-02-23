const mongoose = require('mongoose')

const CoursesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String , 
        required : true
    },
    link : {
        type :String ,
        required : true
    },
    category : {
        type : String,
        required : true
    }
})


const Coureses = mongoose.model('Courses' , CoursesSchema)

module.exports = Coureses