const Model = require('./model')

class Tech extends Model {
    static get tableName () {
        return 'techs'
    }

    static get relationMappings () {

        const Spot = require('./spot')

        return {
            spots: {
                relation: Model.ManyToManyRelation,
                modelClass: Spot,
                join: {
                    from: 'techs.id',
                    through: {
                        from: 'spot_techs.tech_id',
                        to: 'spot_techs.spot_id'
                    },
                    to: 'spots.id'
                }
            }
        }
    }
}

module.exports = Tech