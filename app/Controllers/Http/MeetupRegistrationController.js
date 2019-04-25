'use strict'

const Mail = use('Mail')

const User = use('App/Models/User')
const Meetup = use('App/Models/Meetup')

class MeetupRegistrationController {
  async store ({ params, request, response }) {
    try {
      const userId = request.input('user')
      const meetupId = params.id

      const user = await User.findOrFail(userId)
      const meetup = await Meetup.findOrFail(meetupId)

      user.meetups().sync(meetupId)

      user.save()

      await Mail.send(
        ['emails.meetup-registration', 'emails.meetup-registration-text'],
        {
          user,
          meetup
        },
        message => {
          message
            .to(user.email)
            .from('hello@meetapp.com', 'Meetapp Team')
            .subject('Confirmação de inscrição')
        }
      )
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Registration failed'
        }
      })
    }
  }
}

module.exports = MeetupRegistrationController
