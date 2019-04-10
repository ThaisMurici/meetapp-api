'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const users = await User.all()
    return users
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async store ({ request }) {
    const userData = request.only(['name', 'email', 'password'])
    const preferencesIds = request.input('preferences')

    const user = await User.create(userData)

    if (preferencesIds && preferencesIds.length > 0) {
      await user.preferences().sync(preferencesIds)
    }

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const name = request.input('name')
    const preferencesIds = request.input('preferences')

    if (name) {
      user.merge({ name })
    }

    if (preferencesIds && preferencesIds.length > 0) {
      await user.preferences().sync(preferencesIds)
    }

    await user.save()
    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
