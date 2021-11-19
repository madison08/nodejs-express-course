const mongoose = require('mongoose')

const app = require('./app')


// console.log(process.env)

mongoose.connect('mongodb://localhost:27017/natours-app').then((res) => {
    console.log('[database] is running')
})

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: String,
        default: 4.5
    },
    price: {
        type: String,
        required: [true, 'A tour must have a price']
    }
})

const Tour = mongoose.model('Tour', tourSchema)

const test = new Tour({
    name: 'The forest hikerwer',
    rating: 4.7,
    price: 485
})

test.save().then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})

