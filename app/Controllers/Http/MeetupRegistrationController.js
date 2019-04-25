'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/MeetupRegistrationMail')

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

      Kue.dispatch(Job.key, { user, meetup }, { attempts: 3 })
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
