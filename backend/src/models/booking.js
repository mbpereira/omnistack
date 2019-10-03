const Model = require('./model')

class Booking extends Model {

    static get tableName () {
        return 'bookings'
    }

    static get relationMappings () {

        const User = require('./user')
        const Spot = require('./spot')

        return {

            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'bookings.user_id',
                    to: 'users.id'
                }
            },
            spot: {
                relation: Model.BelongsToOneRelation,
                modelClass: Spot,
                join: {
                    from: 'bookings.spot_id',
                    to: 'spots.id'
                }
            }
        }
    }
}

module.exports = Booking