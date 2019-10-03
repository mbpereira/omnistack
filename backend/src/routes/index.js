const express = require('express')
const { Booking, Tech, User, Spot, Session } = require('../controllers')
const { multiparty } = require('../middlewares')

const router = express.Router()

router.post('/login', Session.login)

router.get('/techs', Tech.index)
router.get('/techs/:id', Tech.show)
router.post('/techs', Tech.store)

router.post('/users', User.store)

router.get('/spots', Spot.index)
router.get('/spots/:id', Spot.show)
router.post('/spots', multiparty, Spot.store)

router.post('/spots/:spot_id/bookings', Booking.store)

module.exports = router