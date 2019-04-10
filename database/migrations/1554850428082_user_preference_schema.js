'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPreferenceSchema extends Schema {
  up () {
    this.create('user_preferences', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('preference_id')
        .unsigned()
        .references('id')
        .inTable('preferences')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_preferences')
  }
}

module.exports = UserPreferenceSchema
