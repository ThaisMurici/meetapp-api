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
  async index () {
    const meetups = await Meetup.query()
      .with('address')
      .with('picture')
      .fetch()
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

    const trx = await Database.beginTransaction()

    const meetup = await Meetup.create(meetupData, trx)

    if (meetupAdress) {
      await meetup.address().create(meetupAdress, trx)
    }

    await trx.commit()

    await meetup.load('address')

    await meetup.load('picture')

    return meetup
  }

  /**
   * Display a single meetup.
   * GET meetups/:id
   */
  async show ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)
    await meetup.load('address')
    await meetup.load('picture')

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

    const trx = await Database.beginTransaction()

    meetup.merge(data, trx)

    if (meetupAdress) {
      await meetup.address().update(meetupAdress, trx)
    }

    await trx.commit()

    await meetup.load('address')

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
