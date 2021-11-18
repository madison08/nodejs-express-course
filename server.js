const app = require('./app')


// console.log(process.env)

app.listen('3200', () => {

    console.log('[server] running on http://localhost:3200')
})