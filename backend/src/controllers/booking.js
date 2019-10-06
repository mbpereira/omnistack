const { Booking } = require('../models')

class BookingController {
    static store (req, res, next) {
        
        const user_id = Number(req.headers.user_id || req.query.user_id || req.body.user_id)
        const { spot_id } = req.params
        const { date } = req.body

        Booking.query().insert({
            user_id,
            spot_id,
            date
        })
        .returning('*')
        .eager('[spot.[user], user]')
        .then(booking => {

            const ownerSocket = req.connecteds[booking.spot.user.id]

            if(ownerSocket) {
                req.io.to(ownerSocket).emit('booking_request', booking)
            }


            res.status(201).send(booking)
        
        })
        .catch(next)

    }


    static approve(req, res, next) {

        const { booking_id } = req.params

        Booking.query().findById(booking_id)
            .patch({
                approved: true
            })
            .returning('*')
            .eager('[spot.[user], user]')
            .then(booking => {

                const ownerSocket = req.connecteds[booking.user_id]

                if(ownerSocket) {
                    req.io.to(ownerSocket).emit('booking_approved', booking)
                }

                res.status(200).send(booking)
            
            })
            .catch(next)

    }
    static reject(req, res, next) {

        const { booking_id } = req.params

        Booking.query().findById(booking_id)
            .patch({
                approved: false
            })
            .returning('*')
            .eager('[spot.[user], user]')
            .then(booking => {

                const ownerSocket = req.connecteds[booking.user_id]

                if(ownerSocket) {
                    req.io.to(ownerSocket).emit('booking_rejected', booking)
                }

                res.status(200).send(booking)
            
            })
            .catch(next)
            
    }
}

module.exports = BookingController