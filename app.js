const express = require('express')
const morgan = require('morgan')

const app = express()
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const errorController = require('./controllers/errorController')



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

    const err = new Error(`can't find ${req.originalUrl}`)

    err.status = 'fail';
    err.statusCode = 404;

    next(err)
})

app.use(errorController)





module.exports = app