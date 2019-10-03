const { User } = require('../models')

class UserController {
    static index () {}
    static show () {}
    static store (req, res, next) {

        const { email } = req.body

        User.query().insert({ email })
            .returning('*')
            .then(users => res.status(201).send(users))
            .catch(next)
            
    }
}

module.exports = UserController