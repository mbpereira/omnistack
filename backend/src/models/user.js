const Model = require('./model')
const Booking = require('./booking')

class User extends Model {

    static get tableName () {
        return 'users'
    }

    static get relationMappings () {
        
        const Spot = require('./spot')

        return {
            spots: {
                relation: Model.HasManyRelation,
                modelClass: Spot,
                join: {
                    from: 'users.id',
                    to: 'spots.user_id'
                }
            },
            bookings: {
                relation: Model.HasManyRelation,
                modelClass: Booking,
                join: {
                    from: 'users.id',
                    to: 'bookings.user_id'
                }
            },
        }
    }
}

module.exports = User