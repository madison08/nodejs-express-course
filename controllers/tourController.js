
const fs = require('fs')
const Tour = require('../models/tourModel')


const tours = JSON.parse(fs.readFileSync(__dirname + '/../dev-data/tours.json',"utf-8"))


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

exports.getAllTour = (req, res) => {

    res.json({
        status: "success",
        results: tours.length, 
        data: {
            tours
        }
    })

}

exports.getTour = (req, res) => {

    // const id = req.params.id * 1
    // const tour = tours.find((tours) => tours.id === id)

    // if(!tour){
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "Not found tours"
    //     })
    // }

    res.json({
        status: "success",
        data: {
            tour: tour
        }
    })

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

exports.updateTour = (req, res) => {

    // const id = req.params.id * 1
    // const tour = tours.find((tours) => tours.id === id)

    // if(!tour){
    //     return res.status(404).json({
    //         status: "fail",
    //         message: "Not found tours"
    //     })
    // }

    res.status(200).json({
        status: "success",
        data: {
            tour: 'tours is updated'
        }
    })


}

exports.deleteTour = (req, res) =>{

    // const id = req.params.id * 1
    // const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "deleted"
        })
    }
}
