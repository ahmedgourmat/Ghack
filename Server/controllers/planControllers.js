const { PriceChangeOutlined } = require('@mui/icons-material')
const Plan = require('../models/planModel')
const User = require('../models/userModel')

const createPlan = async(req,res)=>{

    const person = req.user
    const {title , desc , price} = req.body

    try {
        
        if(!title || !desc || !price){
            throw Error('Please fill the required fields')
        }

        if(desc.length > 100){
            throw Error('The description is to long')
        }

        if(title.length > 20){
            throw Error('The title is to long')
        }
        

        const user = await User.findById({id : person._id})

        const plan = await Plan.create({user : user._id ,title , desc , price})

        user.plan.push({plan : plan._id})

        user.save()


        res.status(201).json(plan)

    } catch (error) {
        res.status(500).json({error :error.message})
    }
}


const getPlans = async(req , res)=>{

    const user = req.user


    try {
        const data = await Plan.find({user : user._id})

        if(!data) throw Error('There is no data')

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const getOnePlan = async(req,res)=>{
    
    const {id} = req.params

    try {
        
        const data = await Plan.findById(id)
        if(!data) throw Error('There is no data')

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json({error : error.message})
    }


}



const deletePlan = async(req , res)=>{
    const {id} = req.params

    try{
        await Plan.findByIdAndDelete(id)
        res.status(200).json({message : 'Done'})
    }catch (error) {
        res.status(500).json({error : error.message})
    }
}


const updatePlan = async(req , res)=>{

    const {id} = req.params
    const {title , desc , price} = req.body

    try {

        const plan = await planectives.findById(id)

        if(!plan) throw Error('There are no plane with this id')


        if(title){
            if(title.length < 5){
                throw Error('Title is too big')
            }
    
            if(title.length > 25){
                throw Error('Title is should have 25 letters as maximum')
            }
        }

        if(price){
            if(price < 0 ){
                throw Error('price should be above 0')
            }
        }

        if(desc){
            if(desc.length > 250 ){
                throw Error('description is should have 250 letters as maximum')
            }
        }

        const updated = {
            title : title ? title : plan.title,
            desc : desc ? desc : plan.desc,
            price : price ? price : plan.price
        }


        const updatedData = await planectives.findByIdAndUpdate(id , updated , {new : true})

        res.status(200).json(updatedData)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

 
module.exports = {createPlan , getPlans , getOnePlan , deletePlan , updatePlan}