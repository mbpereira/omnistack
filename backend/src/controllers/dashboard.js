const { Spot } = require('../models')


const addLink = (spot) => {
    return {
        ...spot,
        link: `/files/${spot.thumbnail}`
    }
}

class DashboardController {
    static index(req, res, next) {

        const user_id = Number(req.body.user_id || req.headers.user_id || req.query.user_id)

        Spot.query().where('user_id', user_id)
            .then(spots => spots.map(spot => addLink(spot)))
            .then(spots => res.status(200).send(spots))
            .catch(next)

    }
}

module.exports = DashboardController