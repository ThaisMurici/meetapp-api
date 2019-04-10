'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupThemesSchema extends Schema {
  up () {
    this.create('meetup_themes', table => {
      table.increments()
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('cascade')
        .onDelete('cascade')
      table
        .integer('theme_id')
        .unsigned()
        .references('id')
        .inTable('preferences')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetup_themes')
  }
}

module.exports = MeetupThemesSchema
