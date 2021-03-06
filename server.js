const mongoose = require('mongoose')
const dotenv = require('dotenv/config')
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





// local port

app.listen(`${process.env.PORT}`, () => {
    console.log(`[server] running on http://localhost:${process.env.PORT}`)
})


// expose our api external port

// app.listen('8080',`${process.env.EXTERNAL_PORT}`, () => {

//     console.log(`[server] running on ${process.env.EXTERNAL_PORT}`)
// })

