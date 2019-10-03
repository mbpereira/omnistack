const { User } = require('../models')

class Session {

    static login (req, res, next) {
        
        const { email } = req.body

        User.query().where('email', email)
            .first()
            .then(user => res.status(200).send(user))
            .catch(next)
            
    }

}

module.exports = Session