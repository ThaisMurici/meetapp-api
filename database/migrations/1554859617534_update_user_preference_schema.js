'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpdateUserPreferenceSchema extends Schema {
  up () {
    this.table('user_preferences', table => {
      table.increments()
    })
  }

  down () {
    this.table('user_preferences', table => {
      table.dropColumn('id')
    })
  }
}

module.exports = UpdateUserPreferenceSchema
