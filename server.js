const mongoose = require('mongoose')

const app = require('./app')


// console.log(process.env)

mongoose.connect('mongodb://localhost:27017/natours-app').then((res) => {
    console.log('[database] is running')
})

app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})

