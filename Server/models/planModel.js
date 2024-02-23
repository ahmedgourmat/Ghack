const mongoose = require('mongoose')

const PlanSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})


const Plan = mongoose.model('Plan' , PlanSchema)


module.exports = Plan