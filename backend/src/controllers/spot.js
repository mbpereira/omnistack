const path = require('path')
const fs = require('fs')
const moment = require('moment')
const { Spot } = require('../models')
const { errors } = require('../errors')

const addLink = (spot) => {
    return {
        ...spot,
        link: `/files/${spot.thumbnail}`
    }
}

const rm = (file) => new Promise((resolve, reject) => {

    fs.unlink(file, (err) => {

        if(err) return reject(err)

        resolve()
        
    })

})

const cp = (from, to) => new Promise((resolve, reject) => {

    fs.copyFile(from, to, (err) => {

        // e se um arquivo com esse nome já existir?

        if(err) return reject(err)

        resolve()

    })

})


const save = (file) => {

    if(!file.name)
        return Promise.reject({ message: "Arquivo sem nome" })

    const savedAt = moment().format('YYYY-MM-DD_HH-mm-ss')

    const filename = `${savedAt}-${file.name}`

    const from = file.path
    const to = path.join(path.resolve('static/images'), filename)

    return cp(from, to)
        .then(() => rm(from))
        .then(() => filename)
        
}

const saveImages = (files) => {

    if(Array.isArray(files))
        return Promise.all(files.map(file => save(file)))

    return save(files)

}

class SpotController {
    static index (req, res, next) {

        Spot.query().eager('[user, techs]')
            .then(spots => spots.map(addLink))
            .then(spots => res.status(200).send(spots))
            .catch(next)

    }
    static show (req, res, next) {

        const { id } = req.params

        Spot.query().findById(id)
            .eager('[user, techs]')
            .then(addLink)
            .then(spot => res.status(200).send(spot))
            .catch(next)

    }
    static async store (req, res, next) {

        const user_id = Number(req.body.user_id || req.headers.user_id || req.query.user_id)

        if(!req.files || !req.files.thumbnail)
            return res.status(400).send(errors.BadRequest("Voce precisa enviar uma imagem"))

        // recuperar os ids relacionados
        const techs = (req.body.techs) 
            ? req.body.techs.split(',').map(tech => ({ id: tech}))
            : []
        
        const { company, price } = req.body

        try {

            const savedImage = await saveImages(req.files.thumbnail)

            const thumbnail = (savedImage && Array.isArray(savedImage)) ? savedImage[0] : savedImage || ''

            const savedSpot = await Spot.query()
                .insertGraph({ user_id, company, price, thumbnail, techs }, { relate: true })
                .returning('*')
                .eager('techs')

            
            return res.status(200).send(addLink(savedSpot))
            

        } catch (e) {
            next(e)
        }

    }
}

module.exports = SpotController