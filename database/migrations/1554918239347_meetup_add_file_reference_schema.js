'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupAddFileReferenceSchema extends Schema {
  up () {
    this.table('meetups', table => {
      table
        .integer('cover_picture')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('cascade')
        .onDelete('set null')
    })
  }

  down () {
    this.table('meetups', table => {
      table.dropColumn('cover_picture')
    })
  }
}

module.exports = MeetupAddFileReferenceSchema
