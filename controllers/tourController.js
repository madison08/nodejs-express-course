
const { match } = require('assert');
const fs = require('fs')
const Tour = require('../models/tourModel')



exports.aliasTopTours = async (req, res, next) => {

    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

    next()
}


exports.getAllTour = async (req, res) => {

    try{

        // 1) filtering
        const queryObj = { ...req.query }

        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])

        // const tours = await Tour.find({
        //     duration: 5,
        //     difficulty: 'easy'
        // })

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        // console.log(queryObj)

        console.log(JSON.parse(queryStr))


        let query = Tour.find(JSON.parse(queryStr))

        // trie
        if(req.query.sort){

            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)

            query = query.sort(sortBy)
        }else{
            query = query.sort('-createAt')
        }

        // field limiting
        if(req.query.fields){

            const fields = req.query.fields.split(',').join(' ');
            // console.log(fields)
            query = query.select(fields)

        }else{
            query = query.select('-__v')
        }

        // pagination

        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 100
        const skip = (page - 1) * limit

        console.log(skip)

        // 2 - 1 * 1
        // skipp == 1

        // page=2&limit=10
        query = query.skip(skip).limit(limit)

        if(req.query.page){
            const numTours = await Tour.countDocuments()

            if(skip > numTours) throw new Error('This page does not exist')
        }


        // const tours = await Tour.find(req.query)
        // const tours = await Tour.find(JSON.parse(queryStr))
        const tours = await query
        // query.sort().select().skip().limit()

        res.json({
            status: "success",
            results: tours.length, 
            data: {
                tours
            }
        })

    }catch(err){
        res.status(404).json({
            status: 'fail',
            messge: err
        })
    }

}

exports.getTour = async (req, res) => {

    try{

        const tour = await Tour.findById(req.params.id)

        res.json({
            status: "success",
            data: {
                tour: tour
            }
        })


    }catch(err){
        res.status(404).json({
            status: 'fail',
            messge: err
        })
    }


    // const id = req.params.id * 1
    // const tour = tours.find((tours) => tours.id === id)

    // if(!tour){
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "Not found tours"
    //     })
    // }

   

}

exports.createTour = async (req, res) => {

    try{

        const newTour =  await Tour.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })

    }catch(err){

        res.status(400).json({
            status: "fail",
            message: err
        })
    }

}

exports.updateTour = async (req, res) => {

    try{

        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //permet de renvoyer la version mise a jour du document 
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    }catch(err){

        res.status(400).json({
            status: "fail",
            message: err
        })
    }

    


}

exports.deleteTour = async (req, res) =>{

    try{

        const tour = await Tour.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
            message: null
        })

    }catch(err){
        console.log(err)
    }

}
