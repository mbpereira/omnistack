const Model = require('./model')


class SpotTech extends Model {
    static get tableName () {
        return 'spot_techs'
    }
}

module.exports = SpotTech