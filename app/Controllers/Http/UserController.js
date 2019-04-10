'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const userData = request.only(['username', 'email', 'password'])
    const preferencesIds = request.input('preferences')

    const user = await User.create(userData)

    if (preferencesIds && preferencesIds.length > 0) {
      await user.preferences().attach(preferencesIds)
    }

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const preferencesIds = request.input('preferences')

    await user.preferences().attach(preferencesIds)

    await user.save()
    return user
  }
}

module.exports = UserController
