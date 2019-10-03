const { User } = require('../models')

class UserController {
    static index () {}
    static show () {}
    static store (req, res, next) {
        User.query().insert(req.body)
            .returning('*')
            .then(users => res.status(201).send(users))
            .catch(next)
    }
}

module.exports = UserController