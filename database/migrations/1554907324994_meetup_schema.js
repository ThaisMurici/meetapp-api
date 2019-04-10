'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table.string('title', 100).notNullable()
      table.string('description')
      table.timestamp('date').notNullable()
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('cascade')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
