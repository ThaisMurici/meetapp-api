'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async index () {
    const users = await User.query()
      .with('preferences')
      .fetch()

    return users
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async store ({ request }) {
    const userData = request.only(['name', 'email', 'password'])
    const preferencesIds = request.input('preferences')

    const trx = await Database.beginTransaction()

    const user = await User.create(userData, trx)

    if (preferencesIds && preferencesIds.length > 0) {
      await user.preferences().sync(preferencesIds, null, trx)
    }

    await trx.commit()

    await user.load('preferences')

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const name = request.input('name')
    const preferencesIds = request.input('preferences')

    const trx = await Database.beginTransaction()

    if (name) {
      user.merge({ name }, trx)
    }

    if (preferencesIds) {
      await user.preferences().sync(preferencesIds, null, trx)
    }

    await trx.commit()

    await user.load('preferences')

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
