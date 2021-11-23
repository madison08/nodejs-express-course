const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv/config')
// const 

const Tour = require('../models/tourModel')


mongoose.connect('mongodb://localhost:27017/natours-app').then((res) => {
    console.log('[database] with success')
})


// Read json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// import Data into db
const importData = async () => {
    try{

        await Tour.create(tours)
        console.log('Data loaded with success')

    }catch(err){

        console.log(err)

    }
    process.exit()

}

// delete all data from db
const deleteData = async () =>{

    try{

        await Tour.deleteMany()
        console.log('data deleted with success')

    }catch(err){
        console.log(err)
    }
    process.exit()

}

console.log(process.argv)

if(process.argv[2] === '--import'){
    importData()
}else if(process.argv[2] === '--deleted'){
    deleteData()
}
