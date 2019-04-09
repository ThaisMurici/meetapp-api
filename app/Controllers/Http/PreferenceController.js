'use strict'

const Preference = use('App/Models/Preference')

/**
 * Resourceful controller for interacting with preferences
 */
class PreferenceController {
  /**
   * Show a list of all preferences.
   * GET preferences
   */
  async index () {
    const preferences = await Preference.all()
    return preferences
  }

  /**
   * Create/save a new preference.
   * POST preferences
   */
  async store ({ request }) {
    const preferenceType = request.input('type')

    const preference = await Preference.create({ type: preferenceType })
    return preference
  }

  /**
   * Display a single preference.
   * GET preferences/:id
   */
  async show ({ params }) {
    const preference = await Preference.findOrFail(params.id)

    return preference
  }

  /**
   * Update preference details.
   * PUT or PATCH preferences/:id
   */
  async update ({ params, request }) {
    const task = await Preference.findOrFail(params.id)
    const preferenceType = request.input('type')

    task.type = preferenceType

    await task.save()
    return task
  }

  /**
   * Delete a preference with id.
   * DELETE preferences/:id
   */
  async destroy ({ params }) {
    const preference = await Preference.findOrFail(params.id)

    await preference.delete()
  }
}

module.exports = PreferenceController
