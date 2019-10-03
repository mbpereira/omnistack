const { Tech } = require('../models')

class TechController {
    static index (req, res, next) {

        Tech.query().eager('spots')
            .then(techs => res.status(200).send(techs))
            .catch(next)

    }
    static show (req, res, next) {

        const { id } = req.params
        
        Tech.query().findById(id)
            .eager('spots')
            .then(tech => res.status(200).send(tech))
            .catch(next)

    }
    static store (req, res, next) {

        const { name } = req.body

        Tech.query().insert({ name })
            .returning('*')
            .then(createdTechs => res.status(201).send(createdTechs))
            .catch(next)

    }
}

module.exports = TechController