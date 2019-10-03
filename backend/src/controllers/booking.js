const { Booking } = require('../models')
const moment = require('moment')

class BookingController {
    static store (req, res, next) {
        const user_id = Number(req.headers.user_id || req.query.user_id || req.body.user_id)
        const { spot_id } = req.params
        const { date } = req.body

        Booking.query().insert({
            user_id,
            spot_id,
            date: moment(date).format('YYYY-MM-DD HH:mm:ss')
        })
        .returning('*')
        .eager('spot')
        .then(booking => res.status(201).send(booking))
        .catch(next)
    }
}

module.exports = BookingController