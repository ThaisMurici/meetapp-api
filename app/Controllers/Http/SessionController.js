'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, auth, response }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const user = await User.findByOrFail('email', email)

    response.send({ token, user })
  }
}

module.exports = SessionController
