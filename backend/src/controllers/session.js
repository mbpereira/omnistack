const { User } = require('../models')

class Session {

    static async store (req, res, next) {
        
        const { email } = req.body

        try {

            let user = await User.query().where('email', email.toLowerCase()).first()

            if(!!user)
                return res.status(200).send(user)

            user = await User.query().insert({ email: email.toLowerCase() }).returning('*')

            res.status(201).send(user)

        } catch (e) {
            next(e)
        }
            
    }

}

module.exports = Session