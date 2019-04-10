'use strict'

const Model = use('Model')

class Preference extends Model {
  users () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_preferences')
      .withTimestamps()
  }

  meetups () {
    return this.belongsToMany('App/Models/Meetup')
      .pivotTable('meetup_themes')
      .withTimestamps()
  }
}

module.exports = Preference
