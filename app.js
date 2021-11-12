const express = require('express')
const fs = require('fs')

const app = express()



app.use(express.json())

app.use((req, res, next) =>{

    console.log('my custom middleware')

    // res.send('success')

    next()


})


const tours = JSON.parse(fs.readFileSync(__dirname + '/dev-data/tours.json',"utf-8"))

// fs.writeFile(__dirname + '/txt/input.txt', infos,  )

const getAllTour = (req, res) => {

    res.json({
        status: "success",
        results: tours.length, 
        data: {
            tours
        }
    })

}

const getTour = (req, res) => {

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

const createTour = (req, res) => {


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

const updateTour = (req, res) => {

    const id = req.params.id * 1
    const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Not found tours"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: 'tours is updated'
        }
    })


}

const deleteTour = (req, res) =>{

    const id = req.params.id * 1
    const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "deleted"
        })
    }



}

// app.get('/api/v1/tours', getAllTour)

// app.get('/api/v1/tours/:id', getTour)

// app.post('/api/v1/tours', createTour)

// app.patch('/api/v1/tours/:id', updateTour)

// app.delete('/api/v1/tours/:id', deleteTour)


app.route('/api/v1/tours')
    .get(getAllTour)
    .post(createTour)
    
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)




app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})