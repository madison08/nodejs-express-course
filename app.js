const express = require('express')
const morgan = require('morgan')

const app = express()
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')



app.use(morgan('dev'))
app.use(express.json())
// app.use(express.urlencoded(true))
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) =>{

    console.log('my custom middleware')

    // res.send('success')

    next()


})




app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {

    // res.status(404).json({
    //     status: 'fail',
    //     message: `can't find ${req.originalUrl}`
    // })

    const err = new Error(`can't find ${req.originalUrl}`)

    err.status = 'fail';
    err.statusCode = 404;

    next(err)
})

app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;

    err.status = err.status || 'error'

    res.status(err.statusCode).json({

        status: err.status,
        message: err.message

    })
})





module.exports = app