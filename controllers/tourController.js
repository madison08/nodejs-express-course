
const fs = require('fs')


const tours = JSON.parse(fs.readFileSync(__dirname + '/../dev-data/tours.json',"utf-8"))


exports.checkID = (req, res, next, val) => {

    console.log('val id: ', val)

    const id = val * 1
    const tour = tours.find((tours) => tours.id === id)


    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    next()

}

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

    // console.log(req.params.id + 1)



    const id = req.params.id * 1
    const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Not found tours"
        })
    }

    res.json({
        status: "success",
        data: {
            tour: tour
        }
    })

}

exports.createTour = (req, res) => {


    const newId = tours[tours.length - 1].id + 1
    const newTours = Object.assign({ id: newId }, req.body)

    tours.push(newTours)

    fs.writeFile(__dirname + '/dev-data/tours.json', JSON.stringify(tours), (err) => {

        res.status(201).json({
            status: "success",
            data: {
                tour: newTours
            }
        })

    })


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

    const id = req.params.id * 1
    const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "deleted"
        })
    }
}
