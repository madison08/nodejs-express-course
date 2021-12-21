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

        if(!tour){
            return res.status(404).json({
                status: 'fail',
                message: 'not found'
            })
        }

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

        if(!tour){
            return res.status(404).json({
                status: 'fail',
                message: 'not found'
            })
        }

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

        if(!tour){
            return res.status(404).json({
                status: 'fail',
                message: 'not found'
            })
        }

        res.status(200).json({
            status: "success",
            message: null
        })

    }catch(err){
        console.log(err)
    }

}


exports.getTourStats = async (req, res) => {

    try{

        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: '$difficulty',
                    // _id: '$ratingsAverage',
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: `$price` }, //null here because price is string
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            },
            {
                $sort: {
                    numRatings: 1
                }
            },
            // {
            //     $match: {
            //         _id: { $ne: 'easy' }
            //     }
            // }
        ])

        res.json({
            status: "success",
            data: {
                stats
            }
        })



    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })

    }

}

exports.getMonthlyPlan = async (req, res) => {

    try{

        const year = req.params.year * 1

        // unwind va permettre de decomposer un tableau a l'interieur d'un document 

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1},
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1
                }
            },
            {
                $limit: 12
            }
        ])

        res.json({
            status: "success",
            data: {
                plan
            }
        })


    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })

    }
}