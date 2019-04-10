'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserMeetupSchema extends Schema {
  up () {
    this.create('user_meetups', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_meetups')
  }
}

module.exports = UserMeetupSchema
