const { Tech } = require('../models')

const createLink = tech => {
    tech.spots.map(spot => spot.createLink())
}

class TechController {
    static index (req, res, next) {

        if(!!req.query.in)
            return Tech.query().whereIn('id', req.query.in.split(','))
                .eager('spots')
                .then(techs => {
                    techs.map(createLink)
                    res.status(200).send(techs)
                })

        Tech.query().eager('spots')
            .then(techs => {
                techs.map(createLink)
                res.status(200).send(techs)
            })
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

        const data = Array.isArray(req.body) ? req.body : { name: req.body.name }

        Tech.query().insert(data)
            .returning('*')
            .then(createdTechs => res.status(201).send(createdTechs))
            .catch(next)

    }
}

module.exports = TechController