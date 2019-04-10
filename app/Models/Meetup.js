'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  users () {
    return this.belongsToMany('App/Models/User')
      .pivotTable('user_meetups')
      .withTimestamps()
  }

  address () {
    return this.hasOne('App/Models/MeetupAddress')
  }

  picture () {
    return this.hasOne('App/Models/File', 'cover_picture', 'id')
  }

  themes () {
    return this.belongsToMany('App/Models/Preference', 'meetup_id', 'theme_id')
      .pivotTable('meetup_themes')
      .withTimestamps()
  }
}

module.exports = Meetup
