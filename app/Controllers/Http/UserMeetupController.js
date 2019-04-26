'use strict'

const Meetup = use('App/Models/Meetup')
const User = use('App/Models/User')

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

  async showRegistrations ({ params }) {
    const now = new Date()

    const nextRegistrations = await Meetup.query()
      .where('date', '>', now)
      .whereHas('users', usersQuery => {
        usersQuery.wherePivot('user_id', params.id)
      })
      .fetch()

    return nextRegistrations
  }

  async showRecomended ({ params }) {
    const user = await User.query()
      .where('id', params.id)
      .with('preferences')
      .fetch()

    const userPreferences = user.toJSON()[0].preferences
    const preferenceArray = userPreferences.map(preference => preference.id)
    const now = new Date()

    const nextRecomendend = Meetup.query()
      .where('date', '>', now)
      .whereDoesntHave('users', usersQuery => {
        usersQuery.wherePivot('user_id', params.id)
      })
      .whereHas('themes', usersQuery => {
        usersQuery.whereInPivot('theme_id', preferenceArray)
      })
      .fetch()

    return nextRecomendend
  }
}

module.exports = UserMeetupController
