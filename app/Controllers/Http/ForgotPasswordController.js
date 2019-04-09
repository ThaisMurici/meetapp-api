'use strict'

const crypto = require('crypto')
const Mail = use('Mail')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot-password', 'emails.forgot-password-text'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('hello@meetapp.com', 'Meetapp Team')
            .subject('Recuperação de senha')
        }
      )
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong. Check if informed e-mail is correct.'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
