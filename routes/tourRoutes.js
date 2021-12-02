const express = require('express')
// const fs = require('fs')

const { createTour,getAllTour,deleteTour,getTour,updateTour,aliasTopTours,getTourStats, getMonthlyPlan, checkID, checkBody } = require('../controllers/tourController')

const router = express.Router()


// router.param('id', checkID)

// create a check body middleware

router.route('/top-5-cheap').get(aliasTopTours,getAllTour)

router.route('/tour-stats').get(getTourStats)

router.route('/monthly-plan/:year').get(getMonthlyPlan)

router.route('/')
.get(getAllTour)
.post(createTour)


// router.get('/', getAllTour)

// router.post('/', createTour)

router.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)


module.exports = router