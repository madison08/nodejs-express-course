
const { match } = require('assert');
const fs = require('fs')
const Tour = require('../models/tourModel')


// const tours = JSON.parse(fs.readFileSync(__dirname + '/../dev-data/tours.json',"utf-8"))


// exports.checkID = (req, res, next, val) => {

//     console.log('val id: ', val)

//     const id = val * 1
//     const tour = tours.find((tours) => tours.id === id)


//     if(!tour){
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }

//     next()

// }

// exports.checkBody = (req, res, next) =>{
//     console.log('before create')

//     console.log(req.body)

//     if(req.body.name && req.body.price){
//         return next()
//     }

//     res.send('please enter price and name')
// }

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

        if(req.query.sort){

            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)

            query = query.sort(sortBy)
        }else{
            query = query.sort('-createAt')
        }

        if(req.query.fields){

            const fields = req.query.fields.split(',').join(' ');
            // console.log(fields)
            query = query.select(fields)

        }else{
            query = query.select('-__v')
        }


        // const tours = await Tour.find(req.query)
        // const tours = await Tour.find(JSON.parse(queryStr))
        const tours = await query

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
