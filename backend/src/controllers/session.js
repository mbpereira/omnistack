const { User } = require('../models')

class Session {

    static login (req, res, next) {
        User.query().where('email', req.body.email)
            .first()
            .then(user => res.status(200).send(user))
            .catch(next)
    }

}

module.exports = Session