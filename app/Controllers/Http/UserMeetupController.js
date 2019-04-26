'use strict'

const Meetup = use('App/Models/Meetup')

class UserMeetupController {
  async showNext ({ params }) {
    const now = new Date()

    const nextMeetups = await Meetup.query()
      .where('date', '>', now)
      .whereDoesntHave('users', usersQuery => {
        usersQuery.wherePivot('user_id', params.id)
      })
      .fetch()

    return nextMeetups
  }

  async showRegistrations () {}

  async showRecomended () {}
}

module.exports = UserMeetupController
