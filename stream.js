const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
    // fs.readFile('txt/ouput.txt', (err, data) => {

    //     if (err) console.log(err)

    //     res.end(data)

    // })

    // stream
    const readable = fs.createReadStream('txt/ouput.txt')
    readable.on('data', chunk => {
        res.write(chunk)
    })

    readable.on('end', () => {
        res.end()
    })

    readable.on('error', err => {
        console.log(err)

        res.end('File not found')
    })
})


server.listen(3000, () =>{
    console.log('server running on 3000')
})