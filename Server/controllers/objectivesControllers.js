const Objectives = require('../models/objectivesModel')
const axios = require('axios')


const createObj = async(req ,res)=>{

    const user = req.user
    const {title , objective , budget} = req.body

    try {
        
        if(!title || !objective ){
            throw Error('Please fill the required fields')
        }

        const obj = await Objectives.findOne({title})


        if(obj){
            throw Error('There is already this title in other objective')
        }

        if(title.length < 5){
            throw Error('Title is too big')
        }

        if(title.length > 25){
            throw Error('Title is should have 25 letters as maximum')
        }

        if(objective.length > 250 ){
            throw Error('Objective is should have 250 letters as maximum')
        }


        if(budget < 0 ){
            throw Error('Budget should be above 0')
        }

        let recommendation = ''

        await axios.post('http://127.0.0.1:8000/recommendation',{objective , budget : toString(budget) })
        .then((res)=>{
            recommendation = res.data.recommendation
        })
        .catch(err=>{throw Error('There is an error in the model')})

        const data = await Objectives.create({title , objective , budget , recommendation})


        res.status(201).json(data)

    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


const getObj = async(req , res)=>{

    const user = req.user


    try {
        const data = await Objectives.find({user : user._id})

        if(!data) throw Error('There is no data')

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json({error : error.message})
    }
}


const getOneObj = async(req,res)=>{
    
    const {id} = req.params

    try {
        
        const data = await Objectives.findById(id)
        if(!data) throw Error('There is no data')

        res.status(200).json(data)

    } catch (error) {
        res.status(404).json({error : error.message})
    }


}



const deleteObj = async(req , res)=>{
    const {id} = req.params

    try{
        await Objectives.findByIdAndDelete(id)
        res.status(200).json({message : 'Done'})
    }catch (error) {
        res.status(500).json({error : error.message})
    }
}

const updateObj = async(req , res)=>{

    const {id} = req.params
    const {title , objectives , budget} = req.body

    try {

        const obj = await Objectives.findById(id)

        if(!obj) throw Error('There are no objectives with this id')


        if(title){
            const existe = await Objectives.findOne({title})

            if(existe){
                throw Error('There are already an objective with this title')
            }
            if(title.length < 5){
                throw Error('Title is too big')
            }
    
            if(title.length > 25){
                throw Error('Title is should have 25 letters as maximum')
            }
        }

        if(budget){
            if(budget < 0 ){
                throw Error('Budget should be above 0')
            }
        }

        if(objectives){
            if(objectives.length > 250 ){
                throw Error('Objectives is should have 250 letters as maximum')
            }
        }

        const updated = {
            title : title ? title : obj.title,
            objectives : objectives ? objectives : obj.objectives,
            budget : budget ? budget : obj.budget
        }


        const updatedData = await Objectives.findByIdAndUpdate(id , updated , {new : true})

        res.status(200).json(updatedData)
        
    } catch (error) {
        res.status(500).json({error : error.message})
    }

}

module.exports = {createObj , getObj , getOneObj , deleteObj , updateObj}