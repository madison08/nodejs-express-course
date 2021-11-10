const express = require('express')
const fs = require('fs')

const app = express()



app.use(express.json())


const tours = JSON.parse(fs.readFileSync(__dirname + '/dev-data/tours.json',"utf-8"))

// fs.writeFile(__dirname + '/txt/input.txt', infos,  )


app.get('/api/v1/tours', (req, res) => {

    res.json({
        status: "success",
        results: tours.length, 
        data: {
            tours
        }
    })

})

app.get('/api/v1/tours/:id', (req, res) => {

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

})

app.post('/api/v1/tours', (req, res) => {

    // console.log(req.body)

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


})

app.patch('/api/v1/tours/:id', (req, res) => {

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


})

app.delete('/api/v1/tours/:id', (req, res) =>{

    const id = req.params.id * 1
    const tour = tours.find((tours) => tours.id === id)

    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "deleted"
        })
    }



})



app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})