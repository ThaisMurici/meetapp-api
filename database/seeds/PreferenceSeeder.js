'use strict'

/*
|--------------------------------------------------------------------------
| PreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Preference = use('App/Models/Preference')

const defaultPreferenceTypes = [
  {
    type: 'Front-end'
  },
  {
    type: 'Back-end'
  },
  {
    type: 'Mobile'
  },
  {
    type: 'DevOps'
  },
  {
    type: 'Gestão'
  },
  {
    type: 'Marketing'
  }
]

class PreferenceSeeder {
  async run () {
    await Preference.createMany(defaultPreferenceTypes)
  }
}

module.exports = PreferenceSeeder
