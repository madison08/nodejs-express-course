const express = require('express')

const { creataUser,deleteUser,getAllUsers,getUser,updateUser } = require('../controllers/userController')


const router = express.Router()




router.route('/')
.get(getAllUsers)
.post(creataUser)

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)


module.exports = router
