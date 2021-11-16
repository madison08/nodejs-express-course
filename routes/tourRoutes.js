const express = require('express')
// const fs = require('fs')

const { createTour,getAllTour,deleteTour,getTour,updateTour, checkID } = require('../controllers/tourController')

const router = express.Router()


router.param('id', checkID)



router.route('/')
.get(getAllTour)
.post(createTour)

router.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)


module.exports = router