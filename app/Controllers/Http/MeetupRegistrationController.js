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

      console.log('search')

      const registration = await user
        .meetups()
        .wherePivot('meetup_id', meetupId)
        .fetch()

      if (registration.toJSON()[0]) {
        return response.status(200).send({
          message: 'Registration already exists'
        })
      }

      user.meetups().attach(meetupId)

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
