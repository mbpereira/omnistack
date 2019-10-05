
const Model = require('./model')

class Spot extends Model {
    
    createLink() {
        this.link = `/files/${this.thumbnail}`
    }
    static get tableName () {
        return 'spots'
    }

    static get relationMappings () {

        const Tech = require('./tech')
        const User = require('./user')

        return {
            
            techs: {
                relation: Model.ManyToManyRelation,
                modelClass: Tech,
                join: {
                    from: 'spots.id',
                    through: {
                        from: 'spot_techs.spot_id',
                        to: 'spot_techs.tech_id'
                    },
                    to: 'techs.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'spots.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Spot