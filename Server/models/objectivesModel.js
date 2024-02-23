const mongoose = require('mongoose')

const ObjectivesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    objective : {
        type : String,
        required : true
    },
    budget : {
        type : Number,
        default : 0
    },
    recommendation : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})


const Objectives = mongoose.model('Objectives' , ObjectivesSchema)

module.exports = Objectives