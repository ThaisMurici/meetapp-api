'use strict'

const Database = use('Database')
const Meetup = use('App/Models/Meetup')
/**
 * Resourceful controller for interacting with meetups
 */
class MeetupController {
  /**
   * Show a list of all meetups.
   * GET meetups
   */
  async index ({ request }) {
    const { title: queryTitle } = request.get('title')

    let meetups = []
    if (queryTitle) {
      const parsedTerm = `%${queryTitle}%`
      meetups = await Meetup.query()
        .whereRaw(`LOWER(title) like '${parsedTerm}'`)
        .with('address')
        .with('picture')
        .with('themes')
        .withCount('users')
        .fetch()
    } else {
      meetups = await Meetup.query()
        .with('address')
        .with('picture')
        .with('themes')
        .withCount('users')
        .fetch()
    }

    return meetups
  }

  /**
   * Create/save a new meetup.
   * POST meetups
   */
  async store ({ request }) {
    const meetupData = request.only([
      'title',
      'description',
      'date',
      'owner_id',
      'cover_picture'
    ])

    const meetupAdress = request.input('address')
    const meetupThemes = request.input('themes')

    const trx = await Database.beginTransaction()

    const meetup = await Meetup.create(meetupData, trx)

    if (meetupAdress) {
      await meetup.address().create(meetupAdress, trx)
    }

    if (meetupThemes) {
      await meetup.themes().sync(meetupThemes, null, trx)
    }

    await trx.commit()

    await meetup.load('address')
    await meetup.load('themes')

    if (meetup.cover_picture) {
      await meetup.load('picture')
    }

    return meetup
  }

  /**
   * Display a single meetup.
   * GET meetups/:id
   */
  async show ({ params, response }) {
    const meetup = await Meetup.query()
      .where('id', '=', params.id)
      .withCount('users')
      .with('address')
      .with('picture')
      .with('themes')
      .fetch()

    const formattedMeetup = meetup.toJSON()[0]

    if (!formattedMeetup) {
      return response.status(404).send({
        error: {
          message: 'Meetup not found.'
        }
      })
    }

    return meetup
  }

  /**
   * Update meetup details.
   * PUT or PATCH meetups/:id
   */
  async update ({ params, request }) {
    const meetup = await Meetup.findOrFail(params.id)
    const data = request.only(
      'title',
      'description',
      'date',
      'owner_id',
      'cover_picture'
    )
    const meetupAdress = request.input('address')
    const meetupThemes = request.input('themes')

    const trx = await Database.beginTransaction()

    meetup.merge(data, trx)

    if (meetupAdress) {
      await meetup.address().update(meetupAdress, trx)
    }

    if (meetupThemes) {
      await meetup.themes().sync(meetupThemes, null, trx)
    }

    await trx.commit()

    await meetup.load('address')
    await meetup.load('themes')

    if (meetup.cover_picture) {
      await meetup.load('picture')
    }

    return meetup
  }

  /**
   * Delete a meetup with id.
   * DELETE meetups/:id
   */
  async destroy ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)

    await meetup.delete()
  }
}

module.exports = MeetupController
