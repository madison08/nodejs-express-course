const mongoose = require('mongoose')

const app = require('./app')


// console.log(process.env)

mongoose.connect('mongodb://localhost:27017/natours-app').then((res) => {
    console.log('[database] is running')
})



// const test = new Tour({
//     name: 'The forest hikerwer',
//     rating: 4.7,
//     price: 485
// })

// test.save().then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })

app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})

