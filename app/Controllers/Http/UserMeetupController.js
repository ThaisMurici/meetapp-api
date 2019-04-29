'use strict'

const Meetup = use('App/Models/Meetup')
const User = use('App/Models/User')

class UserMeetupController {
  /**
   * Shows next meetups in which user has not registered yet.
   */
  async showNext ({ params }) {
    const now = new Date()

    const nextMeetups = await Meetup.query()
      .where('date', '>', now)
      .whereDoesntHave('users', usersQuery => {
        usersQuery.wherePivot('user_id', params.id)
      })
      .with('address')
      .with('picture')
      .with('themes')
      .withCount('users')
      .fetch()

    return nextMeetups
  }

  /**
   * Shows next meetups in which user has already registered.
   */
  async showRegistrations ({ params }) {
    const now = new Date()

    const nextRegistrations = await Meetup.query()
      .where('date', '>', now)
      .whereHas('users', usersQuery => {
        usersQuery.wherePivot('user_id', params.id)
      })
      .with('address')
      .with('picture')
      .with('themes')
      .withCount('users')
      .fetch()

    return nextRegistrations
  }

  /**
   * Shows next meetups in which user has not registered yet, but that have themes that are of user interest.
   */
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
      .with('address')
      .with('picture')
      .with('themes')
      .withCount('users')
      .fetch()

    return nextRecomendend
  }
}

module.exports = UserMeetupController
